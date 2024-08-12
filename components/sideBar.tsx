"use client";
import Link from "next/link";
import { Box, List, ListItemButton, ListItemText, styled } from "@mui/material";
import Image from "next/image";

const SidebarContainer = styled("div")({
  width: "100%",
  backgroundColor: "#f4f4f4",
  height: "100%",
  padding: "20px",
});

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
});

export const Sidebar = () => {
  const navItems = [
    { text: "Appointments", href: "/" },
    { text: "Clients", href: "/clients" },
  ];

  return (
    <SidebarContainer>
      <List>
        <Box sx={{ position: "relative", width: "200px", height: "50px" }}>
          <Image src="/logo.png" layout="fill" objectFit="contain" alt="logo" />
        </Box>
        {navItems.map((item) => (
          <StyledLink key={item.text} href={item.href}>
            <ListItemButton>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </StyledLink>
        ))}
      </List>
    </SidebarContainer>
  );
};
