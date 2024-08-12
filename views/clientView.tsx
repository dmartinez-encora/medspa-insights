import { Stack, Typography } from "@mui/material";
import { prisma } from "@/lib/prisma";
import { ClientSummary } from "@/components/clientSummary";
import { Client } from "@prisma/client";
import { ClientCard } from "@/components/clientCard";
import { AppointmentCard } from "@/components/appointmentCard";

export const ClientView = async ({
  clientId,
  getCompletion,
}: {
  clientId: Client["id"];
  getCompletion: (clientId: number) => Promise<string | null>;
}) => {
  const client = await prisma.client.findUnique({
    where: {
      id: clientId,
    },
    include: {
      address: true,
    },
  });
  if (!client) return null;

  const appoinments = await prisma.appointment.findMany({
    where: {
      clientId,
    },
    include: {
      serviceMenuItems: true,
    },
    orderBy: [
      {
        startTime: "desc",
      },
    ],
  });
  return (
    <Stack gap={2}>
      <ClientCard client={client} />
      <ClientSummary clientId={clientId} getCompletion={getCompletion} />
      <Stack gap={1}>
        <Typography variant="h5" color="text.primary">
          Appointments
        </Typography>
        {appoinments.map((appoinment) => (
          <AppointmentCard key={appoinment.id} appointment={appoinment} />
        ))}
      </Stack>
    </Stack>
  );
};
