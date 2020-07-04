import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    fontSize: 12,
    marginBottom: 12,
  },
  media: {
    height: 20,
  },
});

export default function Post() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <CardMedia
          component="img"
          alt="ProfPic"
          height="10"
          image="Headshot.png"
          title="Profile Picture"
        />

        <div>
          <Typography className={classes.title} gutterBottom>
            Ashish Mahuli in EECS 280
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            June 20 at 4:40 PM
          </Typography>
        </div>

        <Typography variant="body2" component="p">
          Lorem ipsum dolor sit amet, dicant noluisse definiebas eu pri, ea
          erant corrumpit mei, vim labores luptatum senserit te. Ea malis
          iudicabit vis, ne oblique honestatis vim, pro stet nominati
          delicatissimi cu. Ad admodum intellegebat vix. Duo ne cetero legendos
          instructior, id vel falli senserit deseruisse. Eu iudico labores
          theophrastus nam. Ex constituam interesset sit, no suscipit posidonium
          disputationi quo"
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">React</Button>
        <Button size="small">Comment</Button>
      </CardActions>
    </Card>
  );
}
