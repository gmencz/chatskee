import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import createTwilioClient from 'twilio'
import { authorizeHandler } from '@/util/authorizeHandler'

interface IceServer {
  urls: string | string[]
  username: string
  credential: string
}

const handler = nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  try {
    await authorizeHandler(req)
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    })
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN
  const twilio = createTwilioClient(accountSid, authToken)
  const token = await twilio.tokens.create()

  return res.json({
    iceServers: ((token.iceServers as unknown) as IceServer[]).map(
      iceServer => ({
        urls: iceServer.urls,
        username: iceServer.username,
        credential: iceServer.credential,
      }),
    ),
  })
})

export default handler
