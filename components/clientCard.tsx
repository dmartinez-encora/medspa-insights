import { Address, Client } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { DateTime } from "luxon";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import {
  formatClientsBirthdate,
  formatValue,
  HYPHEN,
  stringAvatar,
} from "@/utils";
import CakeIcon from "@mui/icons-material/Cake";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";

type ClientType = Client & {
  address: Address | null;
};

export const ClientCard = ({ client }: { client: ClientType }) => {
  return (
    <Card variant="outlined" sx={{ overflow: "visible" }}>
      <Link href={`/clients/${client.id}`}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              maxWidth: "287px",
            }}
          >
            <Avatar
              {...stringAvatar(`${client.firstName} ${client.lastName}`)}
            />
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
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {client.firstName} {client.lastName}
              </Typography>
              <Typography
                color="text.secondary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {client.email}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CakeIcon fontSize="small" color="primary" />
            <Typography color="text.primary" sx={{ ml: 1 }}>
              {formatValue(formatClientsBirthdate(client.birthdate))}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MapsHomeWorkIcon fontSize="small" color="primary" />
            <Typography color="text.primary" sx={{ ml: 1 }}>
              {formatValue(client.address?.fullAddress)}
            </Typography>
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
};
