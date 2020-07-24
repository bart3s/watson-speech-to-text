require('dotenv').config();

import axios from 'axios'
import * as _ from 'lodash'
import * as fs from 'fs'
import * as globby from 'globby'

let url = `${process.env["SPEECH_TO_TEXT_URL"]}/v1/recognize`
let outputPrefix = process.env["GDRIVE_PREFIX"]
let apiKey = process.env["SPEECH_TO_TEXT_IAM_APIKEY"]
let authHeader = `Basic ${Buffer.from(`apikey:${apiKey}`).toString('base64')}` 
let wavDirectory = process.argv[3]

async function go() {
    // IBM HTTP Headers
    let config = {
        headers: {
            Authorization: authHeader,
            "Content-Type": "audio/wav"
        }
    }

    // Send the wavs off to IBM to be transcribed
    let transcripts = []
    let failedTranscripts = []
    const paths = await globby([`${wavDirectory}/*.wav`])
    for(let i = 0; i < paths.length; i++) {
        let path = paths[i]
        let filename = path.replace(`${wavDirectory}/`,'').replace('.wav', '.npy')
        try {
            let data = Buffer.from(fs.readFileSync(path))
            let output: any = await axios.post(url, data, config)
            let transcript = output.data.results[0].alternatives[0].transcript
            transcripts.push({transcript:`${transcript.trim()}.`, filename})
            console.log(`🟢 ${filename}`)
        } catch(ex) {
            let transcript = ""
            failedTranscripts.push({transcript: `${transcript}.`, filename})
            // console.log(ex)
            console.error(`🔴 ${filename}`)
        }
    }

    // Write output to file
    let thewords = ""
    for(let i = 0; i < transcripts.length; i++) {
        let line = transcripts[i]
        thewords += `${outputPrefix}${line.filename}|${line.transcript.trim()}\n`
    }
    fs.writeFileSync(process.argv[2], thewords)

    // Write fails to file
    let failedWords = ""
    for(let i = 0; i < failedTranscripts.length; i++) {
        let line = failedTranscripts[i]
        failedWords += `${line.filename}|${line.transcript.trim()}\n`
    }
    if(failedTranscripts.length > 0) {
        fs.writeFileSync(`failed-${process.argv[2]}`, failedWords)
    }
}

go()