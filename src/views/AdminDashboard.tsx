import React, { useState, useContext } from "react";
import clsx from "clsx";
import history from "../utils/historyUtils";
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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  dummyClassList,
  dummyChartData,
  dummyUnreadMessages,
  dummyRecentActivity,
} from "../DummyData/adminDashboard";
import { recentActivityTypes } from "../constants/types/recentActivityTypes";
import {
  Warning as WarningIcon,
  Comment as CommentIcon,
  BubbleChart as PostIcon,
} from "@material-ui/icons";

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
        <Grid item xs={12} sm={12} md={7}>
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
        <Grid item xs={12} sm={12} md={5}>
          <DashboardItemTitle>Recent Activity</DashboardItemTitle>
          <Paper className={clsx(classes.paper, classes.topRow)}>
            <List disablePadding={true}>
              {dummyRecentActivity.map((activity) => {
                const { id, subject, data, type } = activity;
                return (
                  <React.Fragment key={id}>
                    {" "}
                    <ListItem
                      alignItems="flex-start"
                      className={classes.message}
                    >
                      <ListItemAvatar>
                        {type === recentActivityTypes.TRENDING_POST ? (
                          <PostIcon />
                        ) : type === recentActivityTypes.TRENDING_COMMENT ? (
                          <CommentIcon />
                        ) : (
                          <WarningIcon color="error" />
                        )}
                      </ListItemAvatar>
                      <ListItemText
                        primary={subject}
                        secondary={<React.Fragment>{data}</React.Fragment>}
                      />
                    </ListItem>
                    <Divider variant="fullWidth" component="li" />{" "}
                  </React.Fragment>
                );
              })}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <DashboardItemTitle>
            Unread Messages ({dummyUnreadMessages.length})
          </DashboardItemTitle>
          <Paper className={clsx(classes.paper, classes.secondRow)}>
            <List disablePadding={true}>
              {dummyUnreadMessages.map((message, index) => {
                const { senderName, subject, messageText } = message;
                return (
                  <React.Fragment key={index}>
                    {" "}
                    <ListItem
                      alignItems="flex-start"
                      className={classes.message}
                      onClick={() => {
                        history.push(`/chats/${index}`);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={senderName}
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={subject}
                        secondary={
                          <React.Fragment>{messageText}</React.Fragment>
                        }
                      />
                    </ListItem>
                    <Divider variant="fullWidth" component="li" />{" "}
                  </React.Fragment>
                );
              })}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={7}>
          <DashboardItemTitle>Student Engagement</DashboardItemTitle>
          <Paper
            className={clsx(classes.paper, classes.secondRow, classes.paperPad)}
          >
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
    textAlign: "center",
    color: theme.palette.text.secondary,
    overflow: "auto",
  },
  paperPad: {
    padding: theme.spacing(0, 2, 2, 2),
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
  message: {
    "&:hover": {
      backgroundColor: "#D3D3D3 !important",
    },
  },
}));
