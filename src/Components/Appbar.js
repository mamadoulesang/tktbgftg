import * as React from 'react';

import {
    Dialog, DialogActions, DialogContent, DialogTitle, AppBar, Box, Toolbar, Button
} from "@material-ui/core"
import TransferForm from './Form';
import {transferTokenHandler} from './connection'

export default function ButtonAppBar() {
const [open,setOpen] = React.useState(false);

const [owner,setOwner] = React.useState("");
const [destination,setDestination] = React.useState("");
const [tokenMint,setTokenMint] = React.useState("");
const [pubKey, setPubKey] = React.useState();

var amount = 1;

const handleOpen = () =>{
    setOpen(true)
}

const handleClose = () =>{
    setOpen(false)
 
}

  return (
    <div>
      <Button color="inherit" onClick={() => transferTokenHandler(owner, destination, tokenMint, amount, owner)} >Transfer</Button>
    </div>
  );
}

