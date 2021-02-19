const gcm = require('node-gcm')
const NotificationService = require('../services/NotificationService')

exports.PushNotification = async (response) => {
  try {
    const sender = new gcm.Sender(process.env.FCM_SERVER_KEY)
    const tokens = await NotificationService.getTokenProblem(
      response.idproblems
    )
    const tokensArray = tokens.map((u) => u.get('tokenfcm'))
    const gcmMessage = new gcm.Message()
    gcmMessage.addNotification('title', 'Forum')
    gcmMessage.addNotification('body', response.content)
    gcmMessage.addNotification('click_action', 'FLUTTER_NOTIFICATION_CLICK')
    // Actually send the message
    sender.send(gcmMessage, { registrationTokens: tokensArray }, (err, res) => {
      if (err) console.error(err)
      else console.log(res)
    })
  } catch (error) {
    console.log(error)
  }
}
