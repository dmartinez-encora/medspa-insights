import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import { Grid, Container } from "@mui/material";
import { Sidebar } from "@/components/sideBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medspa Insights",
  description: " AI-Powered Appointment & Treatment Summaries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Grid container spacing={2} sx={{ height: "100vh" }}>
              <Grid item xs={3}>
                <Sidebar />
              </Grid>
              <Grid item xs={9}>
                <Container
                  component="main"
                  sx={{
                    py: 3,
                  }}
                >
                  {children}
                </Container>
              </Grid>
            </Grid>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
