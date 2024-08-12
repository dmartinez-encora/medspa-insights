import { Appointment, ServiceMenuItem } from "@prisma/client";
import { Box, Card, CardContent, Link, Typography } from "@mui/material";
import { DateTime } from "luxon";
import { formatAppointmentDate, formatValue } from "@/utils";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import EditIcon from "@mui/icons-material/Edit";

type AppointmentType = Appointment & {
  serviceMenuItems: ServiceMenuItem[] | null;
};

export const AppointmentCard = ({
  appointment,
}: {
  appointment: AppointmentType;
}) => {
  return (
    <Card variant="outlined" sx={{ overflow: "visible" }}>
      {/* <Link href={`/appointments/${appointment.id}`} /> */}
      <Link href="#">
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: "400px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left",
                overflowX: "hidden",
              }}
            >
              <Typography
                color="text.primary"
                variant="h6"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {formatAppointmentDate(
                  appointment.startTime,
                  appointment.endTime
                )}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MedicalServicesIcon fontSize="small" color="primary" />
            <Typography color="text.primary" sx={{ ml: 1 }}>
              {formatValue(
                appointment.serviceMenuItems?.map((s) => s.name).join(", ")
              )}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EditIcon fontSize="small" color="primary" />
            <Typography color="text.primary" sx={{ ml: 1 }}>
              {formatValue(appointment.note)}
            </Typography>
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
};
