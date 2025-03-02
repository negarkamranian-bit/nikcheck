document.addEventListener("DOMContentLoaded", function () {
    let resultPage = document.getElementById("result-page");

    function checkAndTriggerGif() {
        if (resultPage.style.display !== "none") { 
            let randomInterval = Math.floor(Math.random() * 70000) + 10000;
            setTimeout(showFloatingGif, randomInterval); 
        }
    }

    function showFloatingGif() {
        if (resultPage.style.display === "none") return;

        let gif = document.createElement("img");
        gif.src = "IMG/Heh/C9.gif";  
        gif.style.position = "absolute";
        gif.style.top = Math.random() * (window.innerHeight - 150) + "px"; 
        gif.style.right = "-200px";
        gif.style.width = "150px";
        gif.style.cursor = "pointer";
        gif.style.animation = "floatUpDown 3s ease-in-out infinite"; 
        
        gif.onclick = function () {
            window.open("new.html", "_blank"); 
        };
        document.body.appendChild(gif);

        setTimeout(() => {
            gif.style.transition = "right 7s linear";
            gif.style.right = window.innerWidth + "px"; 
        }, 100);

        setTimeout(() => {
            gif.remove();
        }, 6000);
        checkAndTriggerGif();
    }

    let observer = new MutationObserver(checkAndTriggerGif);
    observer.observe(resultPage, { attributes: true, attributeFilter: ["style"] });

    let style = document.createElement("style");
    style.innerHTML = `
        @keyframes floatUpDown {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); } /* Moves up */
            100% { transform: translateY(0px); } /* Moves back down */
        }
    `;
    document.head.appendChild(style);
});





document.getElementById('start1-button').addEventListener('click', function () {
    const popSound = document.getElementById('popSound');
    popSound.play();
    document.getElementById('start-page').style.display = 'none';
    document.getElementById('interm').style.display = 'flex';
});

document.getElementById('start-button').addEventListener('click', function () {
    const notifSound = document.getElementById('notifSound');
    notifSound.play();
    document.getElementById('interm').style.display = 'none';
    document.getElementById('phone-screen').style.display = 'flex';
});

let currentMessageIndex = 0;
// We keep the scores object for compatibility but no longer use it
const scores = { B: 0, S: 0, W: 0, G: 0, P: 0, D: 0, A: 0, R: 0 };

const dialogue = [
    // 0 (0)
    {
        speaker: 'bot',
        text: ["*New notification from Unknown*"],
        choices: [
            { id: 1, text: '*Open*', type: 'A', next: 2, followUpText: [] },
            { id: 2, text: '*Ignore it*', type: 'R', next: 1, followUpText: [] },
            //{ id: 2, text: 'DEBUG', type: 'O', next: 100, followUpText: [] },
        ]
    },
    // 1
    {
        speaker: 'bot',
        text: ['*Are you sure? It could be important!*'],
        choices: [
            { id: 1, text: 'FINE I\'ll open it', type: 'O', next: 2, followUpText: [] },
        ]
    },
    // 2 (2)
    {
        speaker: 'bot',
        text: ['Hey hey hey!'],
        choices: [
            { id: 1, text: 'I think you got the wrong number', type: 'B', next: 3, followUpText: [] },
            { id: 2, text: 'who r u?', type: 'S', next: 4, followUpText: [] },
            { id: 3, text: '*don\'t reply, it could be a scam!*', type: 'W', next: 5, followUpText: [] },
        ]
    },

    // 3 (3_1)
    {
        speaker: 'bot',
        text: ['Wrong number?! Pfftt that\'s not possible', "You summoned me afterall...","You're the one taking this survey!"],
        choices: [
            { id: 1, text: 'lol idk what ur talking abt', type: 'P', next: 6, followUpText: [] },
            { id: 2, text: 'Who are you?!', type: 'D', next: 6, followUpText: [] }
        ]
    },
    // 4 (3_2)
    {
        speaker: 'bot',
        text: ['Me? You know me!', 'You summoned me just now.', "Wasn't it you who want to take this survey?"],
        choices: [
            { id: 1, text: 'lol idk what ur talking abt', type: 'P', next: 6, followUpText: [] },
            { id: 2, text: 'No srly! Who are you?!', type: 'D', next: 6, followUpText: [] }
        ]
    },
    // 5 (3_3)
    {
        speaker: 'bot',
        text: ["Oh don't ignore me", "You're the one who summoned me!", "Didn't you want to take this survey?"],
        choices: [
            { id: 1, text: 'lol idk what ur talking abt', type: 'P', next: 6, followUpText: [] },
            { id: 2, text: 'Who are you?!', type: 'D', next: 6, followUpText: [] }
        ]
    },

    // 6 (4)
    {
        "text": [
            "Alright, alright, let me explain!",
            "It's negar. I wanted to check in with you but wasn't sure where to start.",
        ],
        "choices": [
            { "id": 1, "text": "Oh really? Maybe you just need to get better at starting conversations.", "type": "P", "next": 7, "followUpText": [] },
            { "id": 2, "text": "Okay, so what's up?", "type": "G", "next": 8, "followUpText": [] },
        ]
    },

    // 7 (5_1)
    {
        "speaker": "bot",
        "text": [
            "Ouch! I'm trying my best here!",
            "Anyways, I'm here to ask you a few questions.",
        ],
        "choices": [
            { "id": 1, "text": "Fine, I'll do it.", "type": "R", "next": 10, "followUpText": [] },
            { "id": 2, "text": "Sounds fun, I'm down!", "type": "A", "next": 10, "followUpText": [] }
        ]
    },
    // 8 (5_2, 5_3)
    {
        "speaker": "bot",
        "text": [
            "Straight to the point, I see.",
            "I'm here to ask you a few questions.",
        ],
        "choices": [
            { "id": 1, "text": "Ok.", "type": "R", "next": 10, "followUpText": [] },
            { "id": 2, "text": "Sounds fun, I'm down!", "type": "A", "next": 10, "followUpText": [] }
        ]
    },

    // 9 (6)
    {
        speaker: 'bot',
        text: ["There will be #n questions!", "Ready?"],
        choices: [
            { id: 1, text: "Alright, ask away!", type: 'O', next: 10, followUpText: [] },
            { id: 3, text: "Let's gooo", type: 'O', next: 10, followUpText: [] },
        ]
    },

    // 10 (Q1)
    {
        "speaker": "bot",
        "text": [
            "Let's get your thoughts on Wednesday.",
            "On a scale of 1 to 10, how would you rate it? 1 being the lowest."
        ],
        "inputType": "text",
        "placeholder": "Enter a number from 1 to 10",
        "next": 11
    },

    // 11 (Q2)
    {
        "speaker": "bot",
        "text": [
            "Hmmm...",
            "What was the best part(s) of Wednesday?"
        ],
        "inputType": "text",
        "placeholder": "Share your thoughts...",
        "next": 12
    },

    // 12 (Q3)
    {
        "speaker": "bot",
        "text": [
            "And what was the worst part(s) of Wednesday?"
        ],
        "inputType": "text",
        "placeholder": "Share your thoughts...",
        "next": 13
    },

    // 13 (Q4)
    {
        "speaker": "bot",
        "text": [
            "Interesting...",
            "So, are you interested in hanging out again sometime?"
        ],
        "choices": [
            { "id": 1, "text": "Yes!", "type": "B", "next": 14, "followUpText": ["I really enjoy your company."] },
            { "id": 2, "text": "Maybe, let's see how it goes.", "type": "W", "next": 14, "followUpText": ["I like keeping things flexible."] },
            { "id": 3, "text": "No, I don't think so.", "type": "N", "next": 20, "followUpText": [] }
        ]
    },
    // 14 (Q5)
    {
        "speaker": "bot",
        "text": [
            "When would be a good date and time for you?"
        ],
        "inputType": "text",
        "placeholder": "Share your thoughts...",
        "next": 15
    },
    // 15 (Final question)
    {
        "speaker": "bot",
        "text": [
            "Is there anything else you'd like to add or share?"
        ],
        "inputType": "text",
        "placeholder": "Share your thoughts...",
        "next": 16
    },
    // 16 (Thank you message)
    {
        "speaker": "bot",
        "text": [
            "Thanks!"
        ],
        "next": 100 // Goes to result display
    },
    // 20 (only shown for "No" response)
    {
        "speaker": "bot",
        "text": [
            "Oh, that's sad :( Well, goodbye ig..."
        ],
        "next": 100
    }
];


function addMessage(speaker, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', speaker);
    messageElement.textContent = text;
    document.getElementById('chatbox').appendChild(messageElement);
    document.getElementById('chatbox').scrollTop = document.getElementById('chatbox').scrollHeight;

}

function showChoices(currentDialogue) {
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = '';

    // If this dialogue has an input type, show a text input instead of choices
    if (currentDialogue.inputType === 'text') {
        const inputContainer = document.createElement('div');
        inputContainer.style.display = 'flex';
        inputContainer.style.width = '100%';
        
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.placeholder = currentDialogue.placeholder || 'Type your response...';
        textInput.style.flex = '1';
        textInput.style.padding = '10px';
        textInput.style.borderRadius = '20px';
        textInput.style.border = '1px solid #ccc';
        textInput.style.marginRight = '5px';
        textInput.style.fontFamily = "'Andale Mono', monospace";
        
        const submitButton = document.createElement('button');
        submitButton.classList.add('choice-button');
        submitButton.textContent = 'Submit';
        submitButton.style.width = 'auto';
        submitButton.onclick = () => {
            if (textInput.value.trim() !== '') {
                handleTextInput(textInput.value, currentDialogue.next);
            }
        };
        
        // Allow pressing Enter to submit
        textInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && textInput.value.trim() !== '') {
                handleTextInput(textInput.value, currentDialogue.next);
            }
        });
        
        inputContainer.appendChild(textInput);
        inputContainer.appendChild(submitButton);
        choicesContainer.appendChild(inputContainer);
        
        // Focus the input field
        setTimeout(() => textInput.focus(), 100);
    } else if (currentDialogue.choices) {
        // Regular choice buttons
        currentDialogue.choices.forEach(choice => {
            const choiceButton = document.createElement('button');
            choiceButton.classList.add('choice-button');
            choiceButton.textContent = choice.text;
            choiceButton.onclick = () => handleChoice(choice.type, choice.type2, choice.type3, choice.id, choice.next);
            choicesContainer.appendChild(choiceButton);
        });
    }
}

function handleTextInput(text, nextIndex) {
    const dingSound = document.getElementById('dingSound');
    dingSound.play();
    
    currentMessageIndex = nextIndex;
    document.getElementById('choices').innerHTML = '';
    addMessage('user', text, false);
    
    proceedToNextStep(0);
}

function handleChoice(type, type2, type3, id, nextIndex) {
    const dingSound = document.getElementById('dingSound');
    dingSound.play();
    const chosenOption = dialogue[currentMessageIndex].choices.find(choice => choice.type === type && choice.id === id);
    currentMessageIndex = nextIndex;
    document.getElementById('choices').innerHTML = '';
    addMessage('user', chosenOption.text, false);

    if (type === 'N') {
        setTimeout(() => {
            showTypingDots();
            setTimeout(() => {
                stopTypingDots();
                addMessage('bot', "Oh, that's sad :( Well, goodbye ig...");
                setTimeout(() => {
                    triggerIconShower();
                    displayResult();
                }, 1500);
            }, 1500);
        }, 500);
        return;
    }

    if (chosenOption.followUpText && chosenOption.followUpText.length > 0) {
        chosenOption.followUpText.forEach((followUp, index) => {
            setTimeout(() => {
                addMessage('user', followUp);
            }, (index + 1) * 1000);
        });
    }

    proceedToNextStep((chosenOption.followUpText?.length || 0) * 1000);
}


function proceedToNextStep(delay) {
    setTimeout(() => {
        showTypingDots();

        setTimeout(() => {
            stopTypingDots();
            const popSound = document.getElementById('popSound');
            popSound.play();
            if (currentMessageIndex == 0 || currentMessageIndex == 2 || currentMessageIndex >=3 ) {
                const header = document.getElementById("header");
                header.textContent = 'Unknown';
                header.style.color = 'var(--6-color)';
                header.style.backgroundColor = 'var(--2-color)';
                const phoneScreen = document.getElementById("phone-screen");
                phoneScreen.style.backgroundColor = '#fff';
            }

            if (currentMessageIndex >= 6) {
                const header = document.getElementById("header");
                header.textContent = 'negar';
                header.style.color = 'var(--6-color)';
            }

            if (currentMessageIndex === 16 || currentMessageIndex === 20 || currentMessageIndex === 100) {
                // If we're at the thank you message or final message, show the result
                const currentDialogue = dialogue[currentMessageIndex];
                currentDialogue.text.forEach((text, index) => {
                    setTimeout(() => {
                        addMessage(currentDialogue.speaker, text);
                        if (index === currentDialogue.text.length - 1) {
                            // After the last message is shown, trigger the result display
                            setTimeout(() => {
                                triggerIconShower();
                                displayResult();
                            }, 1000);
                        }
                    }, index * 1000);
                });
            } else if (currentMessageIndex < dialogue.length) {
                const currentDialogue = dialogue[currentMessageIndex];
                currentDialogue.text.forEach((text, index) => {
                    setTimeout(() => {
                        addMessage(currentDialogue.speaker, text);
                    }, index * 1000);
                });
                setTimeout(() => {
                    showChoices(currentDialogue);
                }, currentDialogue.text.length * 1000);
            }

        }, 1500);
    }, delay + 500);
}


let typingInterval;
let typingDots = 0;

function showTypingDots() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.textContent = 'typing...';
    document.getElementById('chatbox').appendChild(typingIndicator);
    typingIndicator.style.display = 'inline';

    typingDots = 0;

    typingInterval = setInterval(() => {
        typingIndicator.textContent = '.'.repeat(typingDots % 5);
        typingDots++;
    }, 250);
}

function stopTypingDots() {
    clearInterval(typingInterval);
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Store all user responses for later download
let userResponsesData = {};

function displayResult() {
    // Show a thank you message instead of calculating a result
    document.getElementById("phone-screen").style.display = "none";
    document.getElementById("result-page").style.display = "flex";
    
    // Collect all user responses for download
    collectUserResponses();
    
    // Update the result page to show only a thank you message
    const resultContainer = document.getElementById("result-container");
    if (resultContainer) {
        resultContainer.innerHTML = `
            <h2>Thank you for completing this!</h2>
            <p>Your responses have been saved.</p>
            <div style="margin: 20px 0; padding: 15px; background-color: #e6f2ff; border-radius: 10px; text-align: left; font-size: 14px; line-height: 1.5;">
                <p><strong>This is Negar's way of asking how things went on Wednesday, checking if you are doing fine, and keeping in touch because::</strong></p>
                <p>1. She forgot to ask the day after you went out.</p>
                <p>2. She wasn't quite sure what to say.</p>
                <p>3. She didn't want to make it awkward or make you uncomfortable in any way.</p>
                <p>4. Since you are great company—funny and easy to get along with—she wanted to stay in touch but wasn't sure how. :*/2</p>
                <p>And, she wanted to apologize for any process-related issues, such as being late or having to answer a meeting call. _/_</p>
            </div>
            <button id="download-responses-button" class="restart-button">Download Your Responses</button>
            <button id="take-again-button" class="restart-button" style="margin-top: 10px;">Take it again</button>
        `;
        
        // Add event listeners to the buttons
        setTimeout(() => {
            const downloadButton = document.getElementById("download-responses-button");
            if (downloadButton) {
                downloadButton.addEventListener('click', downloadResponses);
            }
            
            const takeAgainButton = document.getElementById("take-again-button");
            if (takeAgainButton) {
                takeAgainButton.addEventListener('click', restartQuiz);
            }
        }, 100);
        
        // Send results via email (keeping this for compatibility)
        sendResultsByEmail();
    }
}

// Function to collect all user responses
function collectUserResponses() {
    // Get all messages from the chatbox
    const chatMessages = document.querySelectorAll('.message');
    let questionIndex = 0;
    let lastBotMessage = '';
    
    userResponsesData = {};
    
    chatMessages.forEach(message => {
        if (message.classList.contains('bot')) {
            lastBotMessage = message.textContent;
        } else if (message.classList.contains('user')) {
            // This is a user response
            userResponsesData[`Question ${questionIndex}: ${lastBotMessage}`] = message.textContent;
            questionIndex++;
        }
    });
    
    // Add timestamp
    userResponsesData['Submitted on'] = new Date().toLocaleString();
}

// Function to download responses as a text file
function downloadResponses() {
    // Format the responses as text
    let textContent = "NikCheck Survey Responses\n\n";
    
    Object.entries(userResponsesData).forEach(([question, answer]) => {
        textContent += `${question}\nAnswer: ${answer}\n\n`;
    });
    
    // Create a Blob with the text content
    const blob = new Blob([textContent], { type: 'text/plain' });
    
    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'NikCheck_Responses.txt';
    
    // Append to the body, click it, and remove it
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function sendResultsByEmail() {
    // Collect all user answers (now using the global userResponsesData)
    // If userResponsesData is empty, collect the responses
    if (Object.keys(userResponsesData).length === 0) {
        collectUserResponses();
    }
    
    // Create email content
    const emailSubject = "NikCheck Survey Results";
    const emailBody = `
        New survey results:
        
        ${Object.entries(userResponsesData).map(([question, answer]) => 
            `${question}\nAnswer: ${answer}\n`
        ).join('\n')}
    `;
    
    // Use EmailJS or similar service to send the email
    // For this example, we'll use a mailto link that opens in a hidden iframe
    const emailTo = "negarkamranyan@gmail.com";
    const mailtoLink = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Create a hidden iframe to trigger the email client
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
    
    // Use fetch to send the data to a server-side script that would handle the email sending
    // This is a simulated fetch - in a real implementation, you would need a server endpoint
    console.log("Sending email to:", emailTo);
    console.log("Email content:", emailBody);
    
    // In a real implementation, you would use something like:
    /*
    fetch('send-email.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: emailTo,
            subject: emailSubject,
            body: emailBody
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Email sent successfully:', data);
    })
    .catch((error) => {
        console.error('Error sending email:', error);
    });
    */
}

/*function closeResult() {
    document.getElementById('result-overlay').style.display = 'none';
    setTimeout(() => {
        addMessage('bot', 'Would you like to play again?');
        showChoices([
            { text: 'Yes, let's go!', type: 'restart' },
            { text: 'No, thanks.', type: 'exit' }
        ]);
    }, 500);
}*/

function restartQuiz() {
    document.getElementById("result-page").style.display = "none";
    document.getElementById("start-page").style.display = "flex";
    currentMessageIndex = 0;
    // No longer need to reset scores since we're not tracking them
    document.getElementById('chatbox').innerHTML = '';
    document.getElementById('choices').innerHTML = '';
    const header = document.getElementById("header");
    header.textContent = '03/03';
    header.style.color = '#fff';
    header.style.backgroundColor = 'rgb(22, 22, 22)';
    const phoneScreen = document.getElementById("phone-screen");
    phoneScreen.style.backgroundColor = 'rgb(22, 22, 22)';
    startConversation();
}

function startConversation() {
    addMessage('bot', dialogue[0].text);
    showChoices(dialogue[0]);
}

function updateDebugScores() {
    const debugScoresElement = document.getElementById('debug-scores');
    const formattedScores = `Question: ${currentMessageIndex+1}`;
    debugScoresElement.textContent = formattedScores.trim();
}

function share() {
    const link = window.location.href;
    
    navigator.clipboard.writeText(link)
        .then(() => {
            alert('Link copied to clipboard!');
        })
        .catch(err => {
            alert('Failed to copy the link: ' + err);
        });

    html2canvas(document.body).then(canvas => {
        const screenshot = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = screenshot;
        downloadLink.download = 'myresult.png';
        downloadLink.click();
    });
}

function triggerIconShower(event) {
    for (let i = 0; i < 15; i++) {
        const icon = document.createElement('div');
        icon.classList.add('icon');

        const iconContent = Math.random() > 0.5 ? '★' : '★';
        icon.textContent = iconContent;

        if (iconContent === '★') {
            icon.classList.add('star');
        }
        else {
            icon.classList.add('star');
        }

        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        icon.style.left = `${x}px`;
        icon.style.top = `${y}px`;

        document.body.appendChild(icon);

        setTimeout(() => {
            icon.remove();
        }, 3000);
    }
}

startConversation();
