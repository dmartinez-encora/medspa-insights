import { prisma } from "@/lib/prisma";
import { Box, Stack, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { ClientCard } from "@/components/clientCard";

export const ClientsView = async () => {
  const clients = await prisma.client.findMany({
    orderBy: [
      {
        firstName: "asc",
      },
      {
        lastName: "asc",
      },
    ],
    include: {
      address: true,
    },
  });
  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <PeopleAltIcon color="primary" />
          <Typography variant="h4" color="text.primary" sx={{ flexGrow: 1 }}>
            Clients
          </Typography>
        </Stack>
      </Box>

      <Stack gap={1}>
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </Stack>
    </>
  );
};
