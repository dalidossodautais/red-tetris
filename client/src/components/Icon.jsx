import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Build from "@material-ui/icons/Build";
import ExpandLess from "@material-ui/icons/ExpandLess";
import FastForward from "@material-ui/icons/FastForward";
import FastRewind from "@material-ui/icons/FastRewind";
import FormatListNumbered from "@material-ui/icons/FormatListNumbered";
import Lock from "@material-ui/icons/Lock";
import People from "@material-ui/icons/People";
import Settings from "@material-ui/icons/Settings";
import SportsEsports from "@material-ui/icons/SportsEsports";
import Star from "@material-ui/icons/Star";
import StarBorder from "@material-ui/icons/StarBorder";
import VideogameAsset from "@material-ui/icons/VideogameAsset";
import { makeStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";

function useClasses(marginRight, onClick) {
  return makeStyles(() => ({
    icon: {
      cursor: onClick ? "default" : "pointer",
      marginRight,
    },
  }))();
}

export default function Icon({ marginRight, onClick, tooltip, type }) {
  const classes = useClasses(marginRight, onClick);
  const Icon =
    {
      admin: Star,
      gamepad: VideogameAsset,
      keep: ExpandLess,
      nonAdmin: StarBorder,
      people: People,
      player: SportsEsports,
      private: Lock,
      ranking: FormatListNumbered,
      settings: Settings,
      speedDown: FastRewind,
      speedUp: FastForward,
      viewer: Visibility,
    }[type] || Build;
  return (
    <Tooltip title={tooltip || ""}>
      <Icon className={classes.icon} onClick={onClick} />
    </Tooltip>
  );
}
