import React, { useState, useContext } from "react";
import clsx from "clsx";
import { UserContext } from "../constants/UserContext";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import CSVImport from "../components/CSVImport";
import DashboardItemTitle from "../components/DashboardItemTitle";
import DashboardTitle from "../components/DashboardTitle";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const dummyClassList = [
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
  { name: "Chintan Modi", email: "cmodi@umich.edu" },
];

const dummyChartData = [
  { date: "6/1/2020", usage: 0 },
  { date: "6/2/2020", usage: 100 },
  { date: "6/3/2020", usage: 250 },
  { date: "6/4/2020", usage: 300 },
  { date: "6/5/2020", usage: 150 },
  { date: "6/6/2020", usage: 175 },
  { date: "6/7/2020", usage: 200 },
  { date: "6/8/2020", usage: 180 },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(0, 2, 2, 2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    overflow: "auto",
  },
  control: {
    padding: 5,
  },
  topRow: {
    height: 200,
  },
  secondRow: {
    height: 300,
  },
}));

export default function AdminDashboard() {
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const theme = useTheme();

  const [hasRoster, setHasRoster] = useState(false);

  return (
    <Container component="main" maxWidth="md">
      <DashboardTitle>Welcome Admin!</DashboardTitle>
      <Grid container spacing={3}>
        <Grid item xs sm={12} md={7}>
          <DashboardItemTitle>Class Roster</DashboardItemTitle>
          <Paper className={clsx(classes.paper, classes.topRow)}>
            {hasRoster ? (
              <Table size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dummyClassList.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <CSVImport classId={"123456"} setHasRoster={setHasRoster} />
            )}
          </Paper>
        </Grid>
        <Grid item xs sm={12} md={5}>
          <DashboardItemTitle>Recent Activity</DashboardItemTitle>
          <Paper className={clsx(classes.paper, classes.topRow)}></Paper>
        </Grid>
        <Grid item xs sm={12} md={5}>
          <DashboardItemTitle>Unread Messages (12)</DashboardItemTitle>
          <Paper className={clsx(classes.paper, classes.secondRow)}></Paper>
        </Grid>
        <Grid item xs sm={12} md={7}>
          <DashboardItemTitle>Student Engagement</DashboardItemTitle>
          <Paper className={clsx(classes.paper, classes.secondRow)}>
            <ResponsiveContainer>
              <LineChart
                data={dummyChartData}
                margin={{
                  top: 20,
                  right: 10,
                  bottom: 20,
                  left: 10,
                }}
              >
                <XAxis dataKey="date" stroke={theme.palette.text.secondary}>
                  <Label
                    position="bottom"
                    style={{
                      textAnchor: "middle",
                      fill: theme.palette.text.primary,
                    }}
                  >
                    Date
                  </Label>
                </XAxis>
                <Tooltip />
                <YAxis stroke={theme.palette.text.secondary}>
                  <Label
                    angle={270}
                    position="left"
                    style={{
                      textAnchor: "middle",
                      fill: theme.palette.text.primary,
                    }}
                  >
                    Active Users
                  </Label>
                </YAxis>
                <Line
                  type="monotone"
                  dataKey="usage"
                  stroke={theme.palette.primary.main}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
