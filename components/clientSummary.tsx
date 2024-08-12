"use client";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Client } from "@prisma/client";
import { useState } from "react";

export const ClientSummary = ({
  clientId,
  getCompletion,
}: {
  clientId: Client["id"];
  getCompletion: (clientId: number) => Promise<string | null>;
}) => {
  const [summary, setSummary] = useState<string | null>(null);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={async () => {
          const response = await getCompletion(clientId);
          console.log("🚀 ~ onClick={ ~ response:", response);
          setSummary(response);
        }}
      >
        Get client insights
      </Button>
      {summary && (
        <Stack>
          <Typography variant="h5" color="text.primary" mb={1}>
            Client Insights
          </Typography>
          <Stack
            sx={{
              display: "flex",
              gap: 1,
              pl: 2,
            }}
            dangerouslySetInnerHTML={{ __html: summary ?? "" }}
          />
        </Stack>
      )}
    </>
  );
};
