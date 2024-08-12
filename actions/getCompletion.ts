"use server";
import Configuration, { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";
import { prisma } from "@/lib/prisma";
import { DateTime } from "luxon";

export async function getCompletion(clientId: number) {
  // Check for cached completion
  const cached = await getCachedCompletion(clientId);

  if (cached) {
    return cached; // Return the cached completion
  }

  // Generate a new completion if no cache is found
  const newCompletion = await getNewCompletion(clientId);
  if (newCompletion === null) {
    return "We could not get insights at this time. Please try again later";
  }

  // Store the new completion in the cache
  await storeCompletion(clientId, newCompletion);

  return newCompletion;
}

export async function getNewCompletion(clientId: number) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: template,
    },
  ];
  const data = await getClientData(clientId);

  messages.push({ role: "user", content: JSON.stringify(data) });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0,
    });
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating response:", error);
    return "Error generating response";
  }
}

const getClientData = async (clientId: number) => {
  // const client = await prisma.client.findUnique({
  //   where: {
  //     id: clientId,
  //   },
  //   select: {
  //     id: true,
  //     birthdate: true,
  //     firstName: true,
  //     lastName: true,
  //   },
  // });
  const sixMonthsAgo = DateTime.now().minus({ months: 6 }).toISO();
  const appointments = await prisma.appointment.findMany({
    where: {
      clientId,
      startTime: {
        gte: sixMonthsAgo,
      },
    },
    select: {
      startTime: true,
      endTime: true,
      bookingFlow: true,
      serviceMenuItems: {
        select: {
          name: true,
        },
      },
    },
    orderBy: [
      {
        startTime: "desc",
      },
    ],
  });

  const simplifiedAppts = appointments.map((appointment) => {
    return {
      start: appointment.startTime,
      end: appointment.endTime,
      state: appointment.bookingFlow,
      services: appointment.serviceMenuItems.map((s) => s.name),
    };
  });

  return simplifiedAppts;
};

const template = `Summarize from 6 months of appointment data and give some insights into a client scheduling behavior.You don't print technical
 information from the data sent, you just give some insights, if you don't find any, you say *Nothing of notice for this client*.

Here is a list of questions that we want answers to:
Scheduling:
1 Do they usually book in the morning or in the afternoon? 
2 On which days of the week do they prefer to book their appointments?
3 Do they have a frequency for booking? 

Frequently booked:
1. Are there specific services the client consistently books?
2. Is there a trend in the types of services they book over?

Average duration:
1. What is the average duration of the client's appointments?

I am going to provide a template for your output. CAPITALIZED WORDS are my placeholders for content.
Try to fit the output into one or more of the placeholders that I list. Please preserve the formatting and overral template that 
I provide. 

<p><strong>Scheduling patterns:</strong>  PLACEHOLDER </p>
<p><strong>Frequently booked services:</strong>  PLACEHOLDER </p>
<p><strong>Average duration of appointment:</strong>  PLACEHOLDER </p>

`;

// This is the template:

// Scheduling patterns: <placeholder>
// Frequently booked services: <placeholder>
// Average duration of appointment: <placeholder>
/*
Questions that we want answers from the assistant:
1. Does the client have any scheduling patterns?
  1.1 Do they usually book in the morning or in the afternoon? 
  1.2 On which days of the week do they prefer to book their appointments?
  1.3 Do they tend to book appointments on the same day of the week or around the same time each month?
  1.4 Do they have a frequency for booking? 
2. Has the client cancelled more than 10% of their appointments?
  2.2 Is there a pattern to when they cancel (e.g., closer to the appointment date or after a specific event)? we would need cancel date for this
 
3. What types of services does the client most frequently book?
  3.1 Are there specific services the client consistently books (e.g., Neurotoxin treatments)?
  3.2 Is there a trend in the types of services they book over time (e.g., 
  moving from basic treatments to more advanced ones)?

4. How long does the client typically spend in an appointment?
  4.1 What is the average duration of the client’s appointments?
  4.2 Are there any appointments that significantly deviated from this average, and why?

5. Does the client follow up after initial consultations or treatments?
  5.1 What percentage of the client’s appointments are follow-ups? We would need follow up data for this
  5.2 Do they schedule follow-ups immediately, or do they take time between appointments?  We would need follow up data for this
  */

const storeCompletion = async (clientId: number, completionText: string) => {
  const expirationAt = DateTime.now().plus({ hours: 1 }).toJSDate();

  await prisma.completionCache.create({
    data: {
      clientId,
      completion: completionText,
      expirationAt,
    },
  });
};

async function getCachedCompletion(clientId: number) {
  const now = DateTime.now().toJSDate();

  const cachedCompletion = await prisma.completionCache.findFirst({
    where: {
      clientId: clientId,
      expirationAt: {
        gt: now,
      },
    },
    orderBy: {
      createdAt: "desc", // Get the most recent completion
    },
  });

  return cachedCompletion ? cachedCompletion.completion : null;
}
