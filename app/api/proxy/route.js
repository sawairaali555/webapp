export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const target = searchParams.get("url");
    if (!target) return new Response("Missing url", { status: 400 });

    const resp = await fetch(target);
    if (!resp.ok) return new Response("Upstream fetch failed", { status: 502 });

    const headers = new Headers();
    const contentType = resp.headers.get("content-type");
    if (contentType) headers.set("content-type", contentType);

    // Suggest a download filename if upstream didn't provide one
    const disposition = resp.headers.get("content-disposition") || "attachment; filename=download.mp4";
    headers.set("content-disposition", disposition);

    // Allow cross-origin client fetches from browser
    headers.set("Access-Control-Allow-Origin", "*");

    return new Response(resp.body, { status: resp.status, headers });
  } catch (err) {
    return new Response("Proxy error", { status: 500 });
  }
}
