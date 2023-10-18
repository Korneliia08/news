class StartPanel {
    mainHTML = document.querySelector("main");
    nav = document.querySelector("nav");

    whichOption;

    constructor() {
        this.whichOption = "Oleksandr Zinchenko";
        this.createFetch();
        this.nav.addEventListener("click", this.specifyingOption.bind(this));
    }

    specifyingOption(event) {
        this.whichOption = event.target.innerText;
        this.createFetch();
    }

    createFetch() {
        fetch("https://newsapi.org/v2/everything?" + new URLSearchParams({
            q: this.whichOption,
            apiKey: "f7e38cf8db9943fd9c0694f5eb25467f"
        }))
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("fetch error");
                }
            })
            .then(json => {
                this.createProposedNews(json);
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    createProposedNews(jsonObj) {
        // this.mainHTML.innerHTML = ''
        let childrens = Array.from(this.mainHTML.children);
        if (childrens.length > 1) {
            childrens.forEach(children => children.remove());
        }
        let xMax = 7;
        for (let x = 0; x < xMax; x++) {
            if (jsonObj.articles[x].title == "[Removed]") {
                xMax++;
                continue;
            }
            let divForImage = document.createElement("div");
            divForImage.classList.add("currentProposedNewDiv");
            let h2Title = document.createElement("h2");
            h2Title.classList.add("titleArticle");
            let timeHTML = document.createElement("time");
            timeHTML.classList.add("time");

            let spanReadMore = document.createElement("span");
            spanReadMore.classList.add("spanReadMore");
            spanReadMore.textContent = "Read more"

            let image = new Image(250);
            image.classList.add("imgStyle");

            let urlToImage = jsonObj.articles[x].urlToImage;
            let titleArticle = jsonObj.articles[x].title;
            let whenPublish = jsonObj.articles[x].publishedAt;

            image.src = urlToImage;
            image.alt = "image of " + titleArticle
            h2Title.textContent = titleArticle;
            whenPublish = whenPublish.replace("T", ", ").replace("Z", " ");
            timeHTML.textContent = whenPublish;

            divForImage.append(image);
            divForImage.prepend(h2Title);
            divForImage.append(timeHTML);
            divForImage.append(spanReadMore);

            this.mainHTML.append(divForImage);
        }
    }

}


