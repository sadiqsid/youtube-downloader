import ytdl from "ytdl-core";
import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    const info = await ytdl.getInfo(url)
    const videoFormat = ytdl.filterFormats(info.formats, 'video');
    const format = ytdl.chooseFormat(videoFormat, { quality: 'highest' })
    const fileName = `${info.videoDetails.title}.${format.container}`
    const responseHeader = { 'Content-Disposition': `attachment; filename="${fileName}"` };


    return NextResponse.json({ format, responseHeader, fileName })

}


// import ytdl from "ytdl-core";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//     try {
//         const { searchParams } = new URL(request.url);
//         const url = searchParams.get("url");

//         if (!url || !ytdl.validateURL(url)) {
//             return NextResponse.json(
//                 { error: "Invalid or missing URL" },
//                 { status: 400 }
//             );
//         }

//         const info = await ytdl.getInfo(url);
//         const videoFormat = ytdl.filterFormats(info.formats, "video");
//         const format = ytdl.chooseFormat(videoFormat, { quality: "highest" });
//         const fileName = `${info.videoDetails.title}.${format.container}`;
//         const responseHeader = {
//             "Content-Disposition": `attachment; filename="${fileName}"`,
//         };

//         return NextResponse.json({ format, responseHeader, fileName });
//     } catch (error) {
//         return NextResponse.json(
//             { error: "An error occurred while processing the request" },
//             { status: 500 }
//         );
//     }
// }