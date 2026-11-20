import os, sys, json, base64, subprocess, urllib.request, urllib.error
# usage: gen.py <textfile> <out.mp3>
text = open(sys.argv[1]).read().strip(); out = sys.argv[2]
prompt = "Read the following Persian (Farsi) text aloud in natural, warm, soft and calm Persian, like a professional Iranian audiobook narrator with a standard Tehrani accent. Speak clearly at a relaxed pace. Pronounce any Dutch words written in Latin letters the Dutch way:\n\n" + text
body = {"contents":[{"parts":[{"text":prompt}]}],"generationConfig":{"responseModalities":["AUDIO"],
  "speechConfig":{"voiceConfig":{"prebuiltVoiceConfig":{"voiceName":"Sulafat"}}}}}
req = urllib.request.Request("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-tts-preview:generateContent",
  data=json.dumps(body).encode(), headers={"Content-Type":"application/json","x-goog-api-key":os.environ["GEMINI_API_KEY"]})
try: r = json.load(urllib.request.urlopen(req, timeout=240))
except urllib.error.HTTPError as e:
    msg=e.read().decode(); print("HTTP", e.code, json.loads(msg)["error"]["message"][:1200]); sys.exit(2 if e.code==429 else 1)
part = r["candidates"][0]["content"]["parts"][0]["inlineData"]
open(out+".raw","wb").write(base64.b64decode(part["data"]))
fmt = [] if "wav" in part.get("mimeType","") else ["-f","s16le","-ar","24000","-ac","1"]
subprocess.run(["ffmpeg","-hide_banner","-loglevel","error","-y",*fmt,"-i",out+".raw","-af",
 "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.03,areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,areverse",
 "-ac","1","-ar","24000","-c:a","libmp3lame","-b:a","48k",out],check=True); os.remove(out+".raw"); print("ok",out)
