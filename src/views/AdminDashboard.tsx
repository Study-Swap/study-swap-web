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
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { dummyClassList, dummyChartData } from "../DummyData/adminDashboard";

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
          <Paper className={clsx(classes.paper, classes.secondRow)}>
            <List className={classes.root}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Brunch this weekend?"
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        Ali Connors
                      </Typography>
                      {" — I'll be in your neighborhood doing errands this…"}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
            <Divider variant="inset" component="li" />
          </Paper>
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
  inline: {
    display: "inline",
  },
}));
