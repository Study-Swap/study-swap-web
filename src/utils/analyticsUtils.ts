import firebase from "../constants/Firebase";
const analytics = firebase.analytics();

const analyticsTypes = {
  comment: "comment_made",
  post: "post_made",
  login: "login",
  message: "message_sent",
  chat: "chat_created",
  help: "help_reqd",
  editProfile: "edit_profile",
};

export function commentAnalytics(commentText: string, commentId: string) {
  analytics.logEvent(analyticsTypes.comment, {
    comment_text: commentText,
    comment_id: commentId,
  });
}

export function postAnalytics(postText: string, postId: string) {
  analytics.logEvent(analyticsTypes.post, {
    post_text: postText,
    post_id: postId,
  });
}

export function loginAnalytics() {
  analytics.logEvent(analyticsTypes.login);
}

export function messageAnalytics(messageText: string, messageId: string) {
  analytics.logEvent(analyticsTypes.message, {
    message_text: messageText,
    message_id: messageId,
  });
}

export function chatAnalytics(chatMembers: string[], chatId: string) {
  analytics.logEvent(analyticsTypes.chat, {
    members: chatMembers,
    chat_id: chatId,
  });
}

export function helpAnalytics() {
  analytics.logEvent(analyticsTypes.help);
}

export function editProfileAnalytics() {
  analytics.logEvent(analyticsTypes.editProfile);
}
