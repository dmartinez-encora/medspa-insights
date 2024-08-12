import { prisma } from "@/lib/prisma";
import { Box, Stack, Typography } from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { AppointmentCard } from "@/components/appointmentCard";

export const AppointmentsView = async () => {
  const appoinments = await prisma.appointment.findMany({
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
            Appointments
          </Typography>
        </Stack>
      </Box>

      <Stack gap={1}>
        {appoinments.map((appoinment) => (
          <AppointmentCard key={appoinment.id} appointment={appoinment} />
        ))}
      </Stack>
    </>
  );
};
