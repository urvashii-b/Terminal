document.addEventListener("DOMContentLoaded", function() {
    const terminalBody = document.querySelector(".terminal-body");
    const commandHistory = [];
    let historyIndex = -1;

    const commands = {
        "help": `
            about          - learn more about me <br>
            portfolio      - view my website <br>
            clear          - clear the terminal display <br>
            echo           - display custom text or messages <br>
            education      - explore my academic journey <br>
            email          - reach out via Email <br>
            exit           - close the current session <br>
            help           - get a list of available commands <br>
            history        - see your command usage history <br>
            projects       - check out my projects <br>
            pwd            - show the current working directory <br>
            resume         - download my professional resume <br>
            skills         - view my skill set <br>
            socials        - discover my social media profiles <br>
            themes         - browse through available themes <br>
            welcome        - view the introductory section <br>
            whoami         - find out who the current user is <br>
        `,
        "about": "Curiously creative developer.<br>Passionate, UI/UX Frontend dev who loves hackathons + building cool projects💖 <br> Always on the lookout to learn and grow.",
        "portfolio": () => {
            window.open("https://urvashiportfolio.com/", "_blank");
            return '';
        }, 
        "clear": () => { terminalBody.innerHTML = ''; return ''; },
        "echo": (args) => args.join(" "),
        "education": "<b>PES University</b> | 2021 - 2025 <br> <b>FIITJEE</b> | 2019 - 2021 <br><b> Delhi Public School</b> | 2016 - 2019",
        "email": () => {
            window.open("mailto:urvashi.officialcse@gmail.com");
            return 'You can reach me at: urvashi.officialcse@gmail.com';
        },
        "exit": () => window.close(),
        "history": () => commandHistory.join("<br>"),
        "projects": "You can visit my portfolio website / github to see all my projects <hr> These are my personal favorites: <br>1. LLM Career Counselor<br> <img src='/images/counselai.png' style='width:50%; height:auto;'><br>2. AR/AI Fashion Store<br><img src='/images/arbotique.png' style='width:50%; height:auto;'><br>"
        ,"pwd": "You are currently in the root directory.",
        "skills": "I am a fast learner and highly motivated individual. <hr> <b>Languages</b>: C++, Python, JavaScript, Svelte, React <br><b>Tools</b>: Docker, Kubernetes, Git, Framer, Webflow <br><b>Database Technologies</b>: MySQL, MongoDB, Neo4j <br><b>Strengths</b>: DSA, Frontend Development, UI/UX Design, Generative AI <br><b>Soft Skills</b>: Leadership, Team work, Communication, Time Management",
        "socials": "Connect with me on LinkedIn, GitHub, Twitter, etc.",
        "themes": "Theme customization is not available in this version.",
        "welcome": "Hey There! I am Urvashi Bhargava, Senior at PES University, India. <br> An aspiring computer science student with strong interest in coding and frontend development. <br> Won hackathons, published in an international conference and built a company's website.",
        "whoami": "guest@user. But you should know who you are!",
    };

    function processCommand(input) {
        const [command, ...args] = input.split(" ");
        let response;

        if (commands[command]) {
            response = typeof commands[command] === "function" ? commands[command](args) : commands[command];
        } else {
            response = `Command not found: ${command}`;
        }

        return response;
    }

    function addNewPrompt() {
        const newPrompt = document.createElement("p");
        newPrompt.classList.add("prompt");
        newPrompt.innerHTML = `urvashi@desktop:~$ <span contenteditable="true" class="user-input"></span>`;
        terminalBody.appendChild(newPrompt);

        const newUserInput = newPrompt.querySelector(".user-input");
        newUserInput.focus();

        newUserInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
                const input = newUserInput.textContent.trim();
                if (input) {
                    commandHistory.push(input);
                    historyIndex = commandHistory.length;
                    newUserInput.setAttribute("contenteditable", "false");
                    const response = processCommand(input);
                    if (response) {
                        const responseElement = document.createElement("p");
                        responseElement.innerHTML = response;
                        terminalBody.appendChild(responseElement);
                    }
                    addNewPrompt();
                }
            } else if (e.key === "ArrowUp") {
                if (historyIndex > 0) {
                    historyIndex--;
                    newUserInput.textContent = commandHistory[historyIndex];
                    placeCaretAtEnd(newUserInput);
                }
            } else if (e.key === "ArrowDown") {
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    newUserInput.textContent = commandHistory[historyIndex];
                    placeCaretAtEnd(newUserInput);
                } else {
                    historyIndex = commandHistory.length;
                    newUserInput.textContent = "";
                }
            }
        });
    }

    function placeCaretAtEnd(el) {
        el.focus();
        if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
            const range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        } else if (typeof document.body.createTextRange != "undefined") {
            const textRange = document.body.createTextRange();
            textRange.moveToElementText(el);
            textRange.collapse(false);
            textRange.select();
        }
    }

    addNewPrompt();
});
