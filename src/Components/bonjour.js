
    import * as React from 'react';
    
    export default function Bonjour() {
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
        <div>Bah oui frr</div>
      );
    }

    

