# Noice's Watson Speech To Text Helper 

#### Prerequisites

[Install NodeJS](https://nodejs.org/en/)

#### Setup an IBM Cloud Account

As of 7-22-2020....

1. Go here: https://cloud.ibm.com/
2. Create Resource top right
3. Search for `Speech to Text`
4. Select Lite Plan
5. Name your service under `Configure your resource`
6. Click `Create` on Right
7. Click `Service credentials` on the left
8. Click copy on `Default Credentials`
9. Paste them into a notepad/vscode/vim

#### Manually testing IBM STT

Replace `{url}` and `{apikey}` with your url and apikey. 

    NOTE: There shouldn't be `{}` in the final command
    NOTE: You must have the `@` in front of the wav file name.

    curl -X POST -u "apikey:{apikey}" --header "Content-Type: audio/ wav" --data-binary @../wavs/01.wav "{url}/v1/recognize"

#### Running the Tool

1. Make sure you have your wav files broken down into what will ultimately be `lines` in your training/validation files.
2. Rename `.env-example` to `.env` and put your credentials and url from the copied IBM credentials into the `.env` file, replace the `XXXXXXXXX`s.  Also replace the `GDRIVE_PREFIX` value with where your wav files will ultimately be when you run this.  So if you are running with google colab, something like `/content/drive/My Drive/MACHINE_LEARNING/voice-clone/fish-announcer/datasets/wavs/`.  Or make it blank to just have the filename only in the output text file.
3. From a shell, navigate to this project.  Something like `cd ~/projects/watson-speech-to-text` (replace with where ever you cloned the repo)
4. Run `npm install`
5. Run the tool with `npm start output-name.txt wavDirectory`
    a. This will look in `wavDirectory` and send each file to IBM STT service.  When finished it will create an output file that looks similar to the `training.txt` or `validation.txt` that you are used to using with TT2.

#### Example output

    FA001.wav|No shoes Bikini bottom residents have been attacked by a raging torrent of robot hardware
    FA002.wav|authorities are not sure who was responsible for unleashing the mechanical menaces but they have assured us that the person is in big big trouble
    FA003_b.wav|did I say big trouble I meant solely norm is that it's hard to comprehend trouble we'll keep you posted as this tragic story unfolds tragically we're sure
    FA005_b.wav|this is a bikini bottom news update we're getting unconfirmed reports that the robot menace is emanating from the chum bucket the proprietor play didn't has released the following statement


#### Running this tool TL;DR.

Rename `.env-example` to `.env` and replace values with yours.

    npm install
    npm start output-name.txt wavDirectory