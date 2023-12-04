import Head from "next/head";
import * as React from "react";
import { subDays, subHours } from "date-fns";
import { Box, CircularProgress, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewLatestSignin } from "src/sections/overview/overview-latest-signin";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTotalVisitors } from "src/sections/overview/overview-total-visitors";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import useVisits from "src/hooks/useVisits";

const now = new Date();

const useOnsiteVisits = (visits) => {
  return React.useMemo(() => {
    return visits?.filter((v) => v.signout_time == null);
  }, [visits]);
};

const userTypesCount = (type, visits) => {
  switch (type) {
    case "Visitor":
      return visits?.filter((v) => v.userType == 'Visitor').length;
    case "Contractor":
      return visits?.filter((v) => v.userType == 'Contractor').length;
    case "Officer":
      return visits?.filter((v) => v.userType == 'Officer').length;
    case "Staff":
      return visits?.filter((v) => v.userType == 'Staff').length;
    default:
      return 0;
  }
};

const useLatestSignIns = (visits) => {
  return React.useMemo(() => {
    if (visits?.length < 5) {
      return visits;
    } else {
      return visits?.slice(Math.max(visits.length - 5, 1)).reverse();
    }
  }, [visits]);
};

const Page = () => {
  const { visits, isError, isLoading } = useVisits();
  const onsite = useOnsiteVisits(visits);
  const latest = useLatestSignIns(visits);
  return (
    <>
      <Head>
        <title>Overview | Gatekeeper</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          {isLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress size="10rem" />
            </Box>
          ) : (
            <Grid container spacing={3}>
              <Grid xs={12} lg={8}>
                <OverviewSales
                  chartSeries={[
                    {
                      name: "This year",
                      data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
                    },
                    {
                      name: "Last year",
                      data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
                    },
                  ]}
                  sx={{ height: "100%" }}
                />
              </Grid>
              <Grid xs={12} md={6} lg={4}>
                <OverviewTraffic
                  chartSeries={[userTypesCount('Visitor', onsite) ,userTypesCount('Contractor', onsite) , userTypesCount('Officer', onsite) , userTypesCount('Staff', onsite)]}
                  labels={["Visitor", "Contractor", "Officer", "Staff"]}
                  sx={{ mb: "20px" }}
                />
                <OverviewTotalVisitors
                  value={onsite ? onsite.length : 0}
                />
              </Grid>
              <Grid xs={12}>
                <OverviewLatestSignin data={latest} sx={{ height: "100%" }} />
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
