import type { PlasmoCSConfig } from "plasmo"
import {getDecodedMessage} from "~decoder";

console.log(document.querySelector('input[type="password"]'))
const passwordFields = document.querySelectorAll('input[type="password"]')

// insert a style tag at the end of the head
const style = document.createElement('style');
style.innerText = '.plain-sight-active{background: #3b82f6;} .plain-sight-active::placeholder{color: white; font-weight: bold;}'
document.head.appendChild(style);


passwordFields.forEach(dropTarget => {
    dropTarget.addEventListener("drop", onDropEnd);
    dropTarget.addEventListener("dragenter", onDrop);
    dropTarget.addEventListener("dragover", onDrop);
    dropTarget.addEventListener("dragleave", onDropEnd);
});


function onDropEnd(e){
    e.target.placeholder = '';
    e.target.classList.remove('plain-sight-active')
}

function onDrop(e) {
    e.target.placeholder = 'Drop your password image here';
    e.target.classList.add('plain-sight-active')
}

function getBase64(file): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


passwordFields.forEach(passwordField => {
    passwordField.addEventListener('drop', async (ev) => {
        ev.preventDefault();

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...ev.dataTransfer.items].forEach(async (item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {

                    const file : File = item.getAsFile();
                    let password = prompt("What is your password?", "password12");
                    const encoded = await getDecodedMessage(await getBase64(file), password)
                    passwordField.value = encoded;
                    setTimeout(() => {
                        const keyboardEvent = new KeyboardEvent('keydown', {
                            code: 'Enter',
                            key: 'Enter',
                            charCode: 13,
                            keyCode: 13,
                            view: window,
                            bubbles: true
                        });

                        passwordField.dispatchEvent(keyboardEvent);
                    }, 500);
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...ev.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
            });
        }

    });
})

