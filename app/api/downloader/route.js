// import ytdl from "ytdl-core";
// import { NextResponse } from "next/server";

// export async function GET(request) {
//     const { searchParams } = new URL(request.url)
//     const url = searchParams.get('url')
//     const info = await ytdl.getInfo(url)
//     const videoFormat = ytdl.filterFormats(info.formats, 'video');
//     const format = ytdl.chooseFormat(videoFormat, { quality: 'highest' })
//     const fileName = `${info.videoDetails.title}.${format.container}`
//     const responseHeader = { 'Content-Disposition': `attachment; filename="${fileName}"` };


//     return NextResponse.json({ format, responseHeader, fileName })

// }


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



import ytdl from "ytdl-core";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get('url');

        if (!url) {
            return NextResponse.json({ error: 'URL parameter is missing' }, { status: 400 });
        }

        // Validate YouTube URL
        if (!ytdl.validateURL(url)) {
            return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
        }

        // Get video info
        const info = await ytdl.getInfo(url);
        const videoFormat = ytdl.filterFormats(info.formats, 'video');
        const format = ytdl.chooseFormat(videoFormat, { quality: 'highest' });

        // Create readable stream
        const videoStream = ytdl(url, { format });

        // Set headers for file download
        const fileName = `${info.videoDetails.title}.${format.container}`;
        const headers = {
            'Content-Disposition': `attachment; filename="${fileName}"`,
            'Content-Type': 'video/mp4', // Adjust MIME type based on video format
        };

        // Stream video directly to response
        return new NextResponse(videoStream, { headers });

    } catch (error) {
        console.error('Error in video download:', error);
        return NextResponse.json({ error: 'Failed to download video' }, { status: 500 });
    }
}