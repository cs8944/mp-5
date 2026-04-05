import {redirect} from "next/navigation";
import {checkURL} from "@/lib/createURL";

export default async function GoToURL({params}:{params:Promise<{url:string}>}) {
    const {url}=await params;

    const redirectURL = await checkURL(url);
    if(redirectURL !== null) {
        return redirect(redirectURL);
    } else {
        return (
            <p className="text-4xl font-bold text-center m-10">404 URL NOT FOUND</p>
        );
    }
}