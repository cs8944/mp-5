"use server";
import getDB, {URL_LIST} from "@/db";

export async function checkURL(url: string) {
    const dbCluster = await getDB(URL_LIST);
    const isExistingURL = await dbCluster.findOne({ shortURL: url});
    if(isExistingURL) {
        return isExistingURL.longURL;
    }
    return null;
}

async function checkFor200(url: string) {
    let isValid = false;
    await fetch(url)
        .then(res => {
            if(res.status === 200) {
                isValid = true;
            }
        })
        .catch(err => console.error(err))
    return isValid;
}

export default async function createURL(sURL: string, url: string) {
    const payload = {
        shortURL: sURL,
        longURL: url,
    }

    const isExistingURL = await checkURL(sURL);
    const dbCluster = await getDB(URL_LIST);

    const isValid = await checkFor200(url);
    if(!isValid) {
        return null;
    }

    if(isExistingURL === null) {
        await dbCluster.insertOne(payload);
        return payload.shortURL;
    }

    return null;
}
