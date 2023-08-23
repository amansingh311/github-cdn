document.addEventListener("DOMContentLoaded", function () {
  // Get the cross button element
  var closeButton = document.querySelector(".nav-close");

  // Get the collapse element
  var collapseElement = document.querySelector(".collapse");
  var toggleButton = document.querySelector(".navbar-toggler");
  // Add click event listener to the cross button
  closeButton.addEventListener("click", function () {
    // Toggle the collapse element's class

    collapseElement.classList.toggle("show");
  });
});
var currentURL = window.location.href;
console.log(currentURL);
var pathSegments = currentURL.split("/");
console.log(pathSegments);
if (pathSegments.length === 5) {
  const axiosScript = document.createElement("script");
  axiosScript.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
  document.body.appendChild(axiosScript);

  const chatBotData = document.createElement("script");
  chatBotData.src = "../js/chatBotData.js";
  document.body.appendChild(chatBotData);

  const poppinsLink = document.createElement("link");
  poppinsLink.rel = "stylesheet";
  poppinsLink.href = "https://fonts.googleapis.com/css2?family=Poppins";
  document.head.appendChild(poppinsLink);

  const apiUrl = "https://apip.legitt.xyz/api/v1/lana-gpt";
  // const apiToken =
  //   "05ad408b2e9af9c00a9583375d3d1825e9ba582cf88826510bbbe7c93b1e5561";
  const apiToken =
    "60575b2aa0b30cfe04aa87f144e1370238640b89a8a0581a75209c2cebe42371";

  // chat bot html content

  const initiateChatBot = () => {
    const chatBotContainer = document.createElement("div");
    chatBotContainer.classList.add("chatBotContainer");
    chatBotContainer.setAttribute("id", "chatBotToggle");
    const chatBotIcon = document.createElement("img");
    chatBotIcon.src = "../images/chatIcon.png";
    chatBotIcon.alt = "chat bot";
    chatBotIcon.classList.add("chatBotIcon");
    chatBotIcon.classList.add("animateChatIcon");
    chatBotContainer.appendChild(chatBotIcon);

    const chatBotMainPanel = document.createElement("div");
    chatBotMainPanel.classList.add("chatBotMainPanel");
    chatBotMainPanel.classList.add("withoutSuggestions");
    chatBotMainPanel.setAttribute("id", "chatBotMainPanel");

    chatBotMainPanel.innerHTML = `
                                <div class="chatBotPanelHeader">
                                  <div class="chatPanelTitle">
                                    Legitt <span class="titleLabel" id="chatPanelTitleLabel">Pro</span>
                                  </div>
                                  <div class="chatPanelCrossIcon" id="chatPanelCrossIcon">
                                    <img src= "../images/cross-icon.png" alt="" />
                                  </div>
                                </div>
                                <div class="chatBotPanelBody" id="chatBotPanelBody">
                                  <div class="chatMessage">
                                    <img
                                      src="../images/chatIcon.png"
                                      alt=""
                                      class="profileIcon bot"
                                      id="chatProfileIcon"
                                    />
                                    <div class="messageContent">
                                      <div class="userName">Lana</div>
                                      <div class="userMessage">
                                        Hi, I am Lana, your personal assistant. How can I help you today?
                                      </div>
                                    </div>
                                  </div>
                                  <div id="toogleChatDownBtn"><img src= "../images/doubleDownArrow.png" /></div>
                                </div>
                                <div class="chatBotPanelFooter">
                                  <div
                                    class="chatBotSuggestionsContainer"
                                    id="chatBotSuggestionsContainer"
                                  >
                                  </div>
                                  <textarea
                                    name=""
                                    class="chatInput"
                                    id="chatInput"
                                    placeholder="Enter text here..."
                                  ></textarea>
                                  <button class="sendButton" id="sendButton">
                                    <img src= "../images/sendBlue.png" alt="" />
                                  </button>
                                </div>
                            `;

    document.body.appendChild(chatBotContainer);
    document.body.appendChild(chatBotMainPanel);
  };

  // chat bot script logic
  let chatBotToggle = null;
  let chatBotMainPanel = null;
  let sendButton = null;
  let chatPanelCrossIcon = null;
  let chatInput = null;
  let chatBotPanelBody = null;
  let toogleChatDownBtn = null;
  let chatPanelTitleLabel = null;
  let chatBotSuggestionItems = null;
  let chatBotSuggestionsContainer = null;

  window.onload = function () {
    initiateChatBot();
    chatBotToggle = document.getElementById("chatBotToggle");
    chatBotMainPanel = document.getElementById("chatBotMainPanel");
    sendButton = document.getElementById("sendButton");
    chatPanelCrossIcon = document.getElementById("chatPanelCrossIcon");
    chatInput = document.getElementById("chatInput");
    chatBotPanelBody = document.getElementById("chatBotPanelBody");
    toogleChatDownBtn = document.getElementById("toogleChatDownBtn");
    chatPanelTitleLabel = document.getElementById("chatPanelTitleLabel");
    chatBotSuggestionsContainer = document.getElementById(
      "chatBotSuggestionsContainer"
    );

    chatBotMainPanel.style.display = "none";
    toogleChatDownBtn.style.visibility = "hidden";

    let currentUrlPath = window.location.pathname;
    if (currentUrlPath && currentUrlPath.includes("legitt-pro")) {
      chatPanelTitleLabel.innerHTML = "Pro";
      chatPanelTitleLabel.style.visibility = "visible";
    } else if (currentUrlPath && currentUrlPath.includes("legitt-lite")) {
      chatPanelTitleLabel.innerHTML = "Lite";
      chatPanelTitleLabel.style.visibility = "visible";
    } else {
      chatPanelTitleLabel.style.visibility = "hidden";
    }

    if (!currentUrlPath || currentUrlPath == "/" || currentUrlPath == "") {
      chatBotSuggestionItems = chatBotSuggestionsData.home;
    } else {
      currentUrlPath = currentUrlPath.replaceAll("/", "");
      console.log(currentUrlPath);
      chatBotSuggestionItems = chatBotSuggestionsData[currentUrlPath];
      if (!chatBotSuggestionItems || chatBotSuggestionItems.length <= 0) {
        chatBotSuggestionItems = chatBotSuggestionsData.default;
      }
      console.log(chatBotSuggestionItems);
    }

    if (!chatBotSuggestionItems || chatBotSuggestionItems.length <= 0) {
      chatBotMainPanel.classList.add("withoutSuggestions");
    } else {
      chatBotMainPanel.classList.remove("withoutSuggestions");
      for (let i = 0; i < chatBotSuggestionItems.length; i++) {
        // <div class="chatBotSuggestion">Create contract</div>
        let chatBotSuggestion = document.createElement("a");
        chatBotSuggestion.classList.add("chatBotSuggestion");
        chatBotSuggestion.innerHTML = chatBotSuggestionItems[i].label;
        chatBotSuggestion.href = chatBotSuggestionItems[i].routeUrl;
        chatBotSuggestionsContainer.appendChild(chatBotSuggestion);
      }
    }

    sendButton.onmouseover = function () {
      let imgIcon = sendButton.getElementsByTagName("img")[0];
      imgIcon.src = "../images/sendWhite.png";
      sendButton.style.backgroundColor = "#005eff";
    };

    sendButton.onmouseout = function () {
      let imgIcon = sendButton.getElementsByTagName("img")[0];
      imgIcon.src = "../images/sendBlue.png";
      sendButton.style.backgroundColor = "#d6e1fb";
    };

    sendButton.onclick = function () {
      let message = chatInput.value;
      if (message.trim() != "") {
        addChatMessage(message, "user");
        chatInput.value = "";
        setTimeout(() => {
          handleChatServerRequest(message);
        }, 500);
      }
    };

    chatInput.onkeydown = function (e) {
      if (e.code == "Enter") {
        e.preventDefault();
        let message = chatInput.value;
        if (message.trim() != "") {
          addChatMessage(message, "user");
          chatInput.value = "";
          setTimeout(() => {
            handleChatServerRequest(message);
          }, 500);
        }
      }
    };

    chatPanelCrossIcon.onclick = function () {
      chatBotMainPanel.style.display = "none";
    };

    chatBotToggle.onclick = function () {
      let chatBody = document.getElementById("chatBotMainPanel");
      chatBotMainPanel.style.display = "block";
      let toogleImg = chatBotToggle.getElementsByTagName("img")[0];
      toogleImg.classList.remove("animateChatIcon");
    };

    chatBotPanelBody.onscroll = function () {
      // Calculate the scroll position
      var scrollTop = chatBotPanelBody.scrollTop;
      var scrollHeight = chatBotPanelBody.scrollHeight;
      var divHeight = chatBotPanelBody.clientHeight;

      console.log("scrollTop: " + scrollTop);
      console.log("scrollHeight: " + scrollHeight);
      console.log("divHeight: " + divHeight);

      // Check if the user is at the bottom
      var atBottom = scrollTop + divHeight >= scrollHeight - 20;

      if (atBottom) {
        toogleChatDownBtn.style.visibility = "hidden";
        console.log("User is at the bottom of the div");
      } else {
        toogleChatDownBtn.style.visibility = "visible";
        console.log("User has scrolled above the bottom of the div");
      }
    };

    toogleChatDownBtn.onclick = function () {
      let lastElement = chatBotPanelBody.lastChild;
      lastElement.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      chatBodyLastElement.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    };
  };

  const addChatMessage = (message, senderType = "system") => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chatMessage");
    messageDiv.innerHTML = `
                        <img
                            src= "../images/${
                              senderType == "user" ? "user" : "chatIcon"
                            }.png"
                            alt=""
                            class="profileIcon ${
                              senderType == "user" ? "user" : "bot"
                            }"
                        />
                        <div class="messageContent">
                            <div class="userName"> ${
                              senderType == "user" ? "You" : "Lana"
                            }</div>
                            <div class="userMessage">
                                ${message}
                            </div>
                        </div>
                    `;

    const chatBotPanelBody = document.getElementById("chatBotPanelBody");
    const hr = document.createElement("hr");
    chatBotPanelBody.appendChild(hr);
    chatBotPanelBody.appendChild(messageDiv);
    messageDiv.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const addChatBotMessageLoader = () => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chatMessage");
    messageDiv.innerHTML = `
                        <img
                            src= "../images/chatIcon.png"
                            alt=""
                            class="profileIcon bot"
                        />
                        <div class="messageContent">
                            <div class="userName"> Lana </div>
                            <div class="userMessage">
                                <div class="lazyLineLoader"></div>
                                <div class="lazyLineLoader"></div>
                                <div class="lazyLineLoader"></div>
                            </div>
                        </div>
                    `;

    const chatBotPanelBody = document.getElementById("chatBotPanelBody");
    const hr = document.createElement("hr");
    chatBotPanelBody.appendChild(hr);
    chatBotPanelBody.appendChild(messageDiv);
    messageDiv.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    chatInput.disabled = true;
    sendButton.disabled = true;

    return messageDiv;
  };

  const handleChatServerRequest = (userQuery) => {
    if (!userQuery || userQuery.trim() == "") {
      return;
    }

    var data = {
      query: userQuery,
      token: apiToken,
    };

    let addedMessageDiv = addChatBotMessageLoader();
    let messageContentDiv =
      addedMessageDiv.getElementsByClassName("userMessage")[0];

    // Make a POST request to your API endpoint
    axios
      .post(apiUrl, data)
      .then(function (response) {
        // Handle the response from the API
        console.log(response);
        if (response.data && response.data.result) {
          resetChatBotLastMessage(messageContentDiv, response.data.result);
        } else {
          resetChatBotLastMessage(
            messageContentDiv,
            "Sorry, I am not able to process your request at the moment. Please try again later."
          );
        }
      })
      .catch(function (error) {
        // Handle any error that occurs during the request
        console.error(error);
        resetChatBotLastMessage(
          messageContentDiv,
          "Sorry, I am not able to process your request at the moment. Please try again later."
        );
      });
  };

  const resetChatBotLastMessage = (messageContainer, messageContent) => {
    messageContent = messageContent.replaceAll("\n", "<br/>");
    messageContainer.innerHTML = messageContent;
    chatInput.disabled = false;
    chatInput.focus();
    sendButton.disabled = false;
    messageContainer.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };
  console.log("inside if block");
} else {
  console.log("aman");
  const axiosScript = document.createElement("script");
  axiosScript.src = "https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js";
  document.body.appendChild(axiosScript);

  const chatBotData = document.createElement("script");
  chatBotData.src = "../../js/chatBotData.js";
  document.body.appendChild(chatBotData);

  const poppinsLink = document.createElement("link");
  poppinsLink.rel = "stylesheet";
  poppinsLink.href = "https://fonts.googleapis.com/css2?family=Poppins";
  document.head.appendChild(poppinsLink);

  const apiUrl = "https://apip.legitt.xyz/api/v1/lana-gpt";
  // const apiToken =
  //   "05ad408b2e9af9c00a9583375d3d1825e9ba582cf88826510bbbe7c93b1e5561";
  const apiToken =
    "60575b2aa0b30cfe04aa87f144e1370238640b89a8a0581a75209c2cebe42371";

  // chat bot html content

  const initiateChatBot = () => {
    const chatBotContainer = document.createElement("div");
    chatBotContainer.classList.add("chatBotContainer");
    chatBotContainer.setAttribute("id", "chatBotToggle");
    const chatBotIcon = document.createElement("img");
    chatBotIcon.src = "../../images/chatIcon.png";
    chatBotIcon.alt = "chat bot";
    chatBotIcon.classList.add("chatBotIcon");
    chatBotIcon.classList.add("animateChatIcon");
    chatBotContainer.appendChild(chatBotIcon);

    const chatBotMainPanel = document.createElement("div");
    chatBotMainPanel.classList.add("chatBotMainPanel");
    chatBotMainPanel.classList.add("withoutSuggestions");
    chatBotMainPanel.setAttribute("id", "chatBotMainPanel");

    chatBotMainPanel.innerHTML = `
                                <div class="chatBotPanelHeader">
                                  <div class="chatPanelTitle">
                                    Legitt <span class="titleLabel" id="chatPanelTitleLabel">Pro</span>
                                  </div>
                                  <div class="chatPanelCrossIcon" id="chatPanelCrossIcon">
                                    <img src= "../../images/cross-icon.png" alt="" />
                                  </div>
                                </div>
                                <div class="chatBotPanelBody" id="chatBotPanelBody">
                                  <div class="chatMessage">
                                    <img
                                      src="../../images/chatIcon.png"
                                      alt=""
                                      class="profileIcon bot"
                                      id="chatProfileIcon"
                                    />
                                    <div class="messageContent">
                                      <div class="userName">Lana</div>
                                      <div class="userMessage">
                                        Hi, I am Lana, your personal assistant. How can I help you today?
                                      </div>
                                    </div>
                                  </div>
                                  <div id="toogleChatDownBtn"><img src= "../../images/doubleDownArrow.png" /></div>
                                </div>
                                <div class="chatBotPanelFooter">
                                  <div
                                    class="chatBotSuggestionsContainer"
                                    id="chatBotSuggestionsContainer"
                                  >
                                  </div>
                                  <textarea
                                    name=""
                                    class="chatInput"
                                    id="chatInput"
                                    placeholder="Enter text here..."
                                  ></textarea>
                                  <button class="sendButton" id="sendButton">
                                    <img src= "../../images/sendBlue.png" alt="" />
                                  </button>
                                </div>
                            `;

    document.body.appendChild(chatBotContainer);
    document.body.appendChild(chatBotMainPanel);
  };

  // chat bot script logic
  let chatBotToggle = null;
  let chatBotMainPanel = null;
  let sendButton = null;
  let chatPanelCrossIcon = null;
  let chatInput = null;
  let chatBotPanelBody = null;
  let toogleChatDownBtn = null;
  let chatPanelTitleLabel = null;
  let chatBotSuggestionItems = null;
  let chatBotSuggestionsContainer = null;

  window.onload = function () {
    initiateChatBot();
    chatBotToggle = document.getElementById("chatBotToggle");
    chatBotMainPanel = document.getElementById("chatBotMainPanel");
    sendButton = document.getElementById("sendButton");
    chatPanelCrossIcon = document.getElementById("chatPanelCrossIcon");
    chatInput = document.getElementById("chatInput");
    chatBotPanelBody = document.getElementById("chatBotPanelBody");
    toogleChatDownBtn = document.getElementById("toogleChatDownBtn");
    chatPanelTitleLabel = document.getElementById("chatPanelTitleLabel");
    chatBotSuggestionsContainer = document.getElementById(
      "chatBotSuggestionsContainer"
    );

    chatBotMainPanel.style.display = "none";
    toogleChatDownBtn.style.visibility = "hidden";

    let currentUrlPath = window.location.pathname;
    if (currentUrlPath && currentUrlPath.includes("legitt-pro")) {
      chatPanelTitleLabel.innerHTML = "Pro";
      chatPanelTitleLabel.style.visibility = "visible";
    } else if (currentUrlPath && currentUrlPath.includes("legitt-lite")) {
      chatPanelTitleLabel.innerHTML = "Lite";
      chatPanelTitleLabel.style.visibility = "visible";
    } else {
      chatPanelTitleLabel.style.visibility = "hidden";
    }

    if (!currentUrlPath || currentUrlPath == "/" || currentUrlPath == "") {
      chatBotSuggestionItems = chatBotSuggestionsData.home;
    } else {
      currentUrlPath = currentUrlPath.replaceAll("/", "");
      console.log(currentUrlPath);
      chatBotSuggestionItems = chatBotSuggestionsData[currentUrlPath];
      if (!chatBotSuggestionItems || chatBotSuggestionItems.length <= 0) {
        chatBotSuggestionItems = chatBotSuggestionsData.default;
      }
      console.log(chatBotSuggestionItems);
    }

    if (!chatBotSuggestionItems || chatBotSuggestionItems.length <= 0) {
      chatBotMainPanel.classList.add("withoutSuggestions");
    } else {
      chatBotMainPanel.classList.remove("withoutSuggestions");
      for (let i = 0; i < chatBotSuggestionItems.length; i++) {
        // <div class="chatBotSuggestion">Create contract</div>
        let chatBotSuggestion = document.createElement("a");
        chatBotSuggestion.classList.add("chatBotSuggestion");
        chatBotSuggestion.innerHTML = chatBotSuggestionItems[i].label;
        chatBotSuggestion.href = chatBotSuggestionItems[i].routeUrl;
        chatBotSuggestionsContainer.appendChild(chatBotSuggestion);
      }
    }

    sendButton.onmouseover = function () {
      let imgIcon = sendButton.getElementsByTagName("img")[0];
      imgIcon.src = "../../images/sendWhite.png";
      sendButton.style.backgroundColor = "#005eff";
    };

    sendButton.onmouseout = function () {
      let imgIcon = sendButton.getElementsByTagName("img")[0];
      imgIcon.src = "../../images/sendBlue.png";
      sendButton.style.backgroundColor = "#d6e1fb";
    };

    sendButton.onclick = function () {
      let message = chatInput.value;
      if (message.trim() != "") {
        addChatMessage(message, "user");
        chatInput.value = "";
        setTimeout(() => {
          handleChatServerRequest(message);
        }, 500);
      }
    };

    chatInput.onkeydown = function (e) {
      if (e.code == "Enter") {
        e.preventDefault();
        let message = chatInput.value;
        if (message.trim() != "") {
          addChatMessage(message, "user");
          chatInput.value = "";
          setTimeout(() => {
            handleChatServerRequest(message);
          }, 500);
        }
      }
    };

    chatPanelCrossIcon.onclick = function () {
      chatBotMainPanel.style.display = "none";
    };

    chatBotToggle.onclick = function () {
      let chatBody = document.getElementById("chatBotMainPanel");
      chatBotMainPanel.style.display = "block";
      let toogleImg = chatBotToggle.getElementsByTagName("img")[0];
      toogleImg.classList.remove("animateChatIcon");
    };

    chatBotPanelBody.onscroll = function () {
      // Calculate the scroll position
      var scrollTop = chatBotPanelBody.scrollTop;
      var scrollHeight = chatBotPanelBody.scrollHeight;
      var divHeight = chatBotPanelBody.clientHeight;

      console.log("scrollTop: " + scrollTop);
      console.log("scrollHeight: " + scrollHeight);
      console.log("divHeight: " + divHeight);

      // Check if the user is at the bottom
      var atBottom = scrollTop + divHeight >= scrollHeight - 20;

      if (atBottom) {
        toogleChatDownBtn.style.visibility = "hidden";
        console.log("User is at the bottom of the div");
      } else {
        toogleChatDownBtn.style.visibility = "visible";
        console.log("User has scrolled above the bottom of the div");
      }
    };

    toogleChatDownBtn.onclick = function () {
      let lastElement = chatBotPanelBody.lastChild;
      lastElement.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
      chatBodyLastElement.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    };
  };

  const addChatMessage = (message, senderType = "system") => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chatMessage");
    messageDiv.innerHTML = `
                        <img
                            src= "../../images/${
                              senderType == "user" ? "user" : "chatIcon"
                            }.png"
                            alt=""
                            class="profileIcon ${
                              senderType == "user" ? "user" : "bot"
                            }"
                        />
                        <div class="messageContent">
                            <div class="userName"> ${
                              senderType == "user" ? "You" : "Lana"
                            }</div>
                            <div class="userMessage">
                                ${message}
                            </div>
                        </div>
                    `;

    const chatBotPanelBody = document.getElementById("chatBotPanelBody");
    const hr = document.createElement("hr");
    chatBotPanelBody.appendChild(hr);
    chatBotPanelBody.appendChild(messageDiv);
    messageDiv.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };

  const addChatBotMessageLoader = () => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chatMessage");
    messageDiv.innerHTML = `
                        <img
                            src= "../../images/chatIcon.png"
                            alt=""
                            class="profileIcon bot"
                        />
                        <div class="messageContent">
                            <div class="userName"> Lana </div>
                            <div class="userMessage">
                                <div class="lazyLineLoader"></div>
                                <div class="lazyLineLoader"></div>
                                <div class="lazyLineLoader"></div>
                            </div>
                        </div>
                    `;

    const chatBotPanelBody = document.getElementById("chatBotPanelBody");
    const hr = document.createElement("hr");
    chatBotPanelBody.appendChild(hr);
    chatBotPanelBody.appendChild(messageDiv);
    messageDiv.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    chatInput.disabled = true;
    sendButton.disabled = true;

    return messageDiv;
  };

  const handleChatServerRequest = (userQuery) => {
    if (!userQuery || userQuery.trim() == "") {
      return;
    }

    var data = {
      query: userQuery,
      token: apiToken,
    };

    let addedMessageDiv = addChatBotMessageLoader();
    let messageContentDiv =
      addedMessageDiv.getElementsByClassName("userMessage")[0];

    // Make a POST request to your API endpoint
    axios
      .post(apiUrl, data)
      .then(function (response) {
        // Handle the response from the API
        console.log(response);
        if (response.data && response.data.result) {
          resetChatBotLastMessage(messageContentDiv, response.data.result);
        } else {
          resetChatBotLastMessage(
            messageContentDiv,
            "Sorry, I am not able to process your request at the moment. Please try again later."
          );
        }
      })
      .catch(function (error) {
        // Handle any error that occurs during the request
        console.error(error);
        resetChatBotLastMessage(
          messageContentDiv,
          "Sorry, I am not able to process your request at the moment. Please try again later."
        );
      });
  };

  const resetChatBotLastMessage = (messageContainer, messageContent) => {
    messageContent = messageContent.replaceAll("\n", "<br/>");
    messageContainer.innerHTML = messageContent;
    chatInput.disabled = false;
    chatInput.focus();
    sendButton.disabled = false;
    messageContainer.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };
  console.log("inside else if part");
}
