import * as React from "react";
import {
  Tooltip,
  Typography,
  Button,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
  IconButton,
  Paper,
  Grid,
} from "@mui/material";
import useSound from "use-sound";

import { makeStyles } from "@material-ui/styles";
import socketClient from "socket.io-client";
import alertSound from "../assets/alerta.wav";

const SERVER = "https://status-boss.herokuapp.com";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  vivo: {
    background: "#1feb26",
  },
  morto: {
    background: "#cfb8b8",
  },
}));

function Text({ boss }) {
  if (boss.status === "Vivo") {
    return (
      <Typography gutterBottom variant="h5" component="div">
        {boss.status}
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="body2" color="text.secondary">
        Data da morte: {boss.dtMorte}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Respawn aproximado: {boss.dtSpawn}
      </Typography>
    </>
  );
}

export default function MediaCard(props) {
  const classes = useStyles();
  const [boss, setBoss] = React.useState([]);
  const [socket, setSocket] = React.useState(null);
  const [socketConnected, setSocketConnected] = React.useState(false);
  const [play] = useSound(alertSound);
  const soundAlertRef = React.useRef();
  const [desativarAudio, setDesativarAudio] = React.useState([]);

  const [bossVivo, setBossVivo] = React.useState([]);
  React.useEffect(() => {
    setSocket(socketClient(SERVER));
  }, []);

  React.useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      setSocketConnected(socket.connected);
    });
    socket.on("disconnect", () => {
      setSocketConnected(socket.connected);
    });

    socket.on("addNewMessage", (data) => {
      setBoss(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  React.useEffect(() => {
    if (!socket) return;
    socket.on("notificar", (data) => {
      setBossVivo((prevState) => {
        const bossVivoIndex = prevState.findIndex((t) => t.nome === data.nome);
        if (bossVivoIndex !== -1) {
          prevState[bossVivoIndex] = data;
          return [...prevState];
        }
        return [data, ...prevState];
      });
    });
  }, [socket]);

  React.useEffect(() => {
    bossVivo.forEach((boss) => {
      const mounted = localStorage.getItem(boss.nome);
      if (mounted) {
        console.log("boss já foi notificado");
      } else {
        play();
      }
    });
  }),
    [bossVivo];

  const handleClick = (name, status) => {
    const muted = localStorage.getItem(name);
    if (muted) {
      localStorage.removeItem(name);
    } else {
      localStorage.setItem(name, true);
      setDesativarAudio([...desativarAudio, { name: name }]);
    }
  };

  return (
    <div>
      <Grid
        className={classes.container}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {boss.map((token, index) => (
          <Grid item xs={2} sm={4} md={3} key={index}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={`${token.image}`}
                  alt={token.nome}
                />
                <CardContent
                  className={
                    token.status === "Vivo" ? classes.vivo : classes.morto
                  }
                >
                  <Typography gutterBottom variant="h5" component="div">
                    {token.nome}
                  </Typography>
                  <Text boss={token} />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleClick(token.nome, true)}
                >
                  {localStorage.getItem(token.nome)
                    ? "Alarme desativado"
                    : "Alarme ativado"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
