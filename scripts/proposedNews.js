class ProposedNews {
    proposedNewsHTML = document.querySelector(".proposedNews");
    currentArticleHTML = document.querySelector(".currentArticle");
    nav = document.querySelector("nav");
    arrayOfArticles = [];
    whichOption;
    lastVisited;

    constructor() {
        this.nav.addEventListener("click", this.specifyingOption.bind(this));
        document.querySelector("#default").click()
    }

    specifyingOption(event) {
        if (this.lastVisited) {
            this.lastVisited.classList.toggle("selectedOption");
        }
        this.currentArticleHTML.style.display = "none";
        this.proposedNewsHTML.style.display = "flex";
        this.whichOption = event.target.innerText;
        let currentAInNav = event.target;
        currentAInNav.classList.add("selectedOption");
        this.createFetch();
        this.lastVisited = event.target;

    }

    createFetch() {
        fetch("https://newsapi.org/v2/everything?" + new URLSearchParams({
            q: this.whichOption,
            language: "en",
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
                this.arrayOfArticles = json.articles;
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    createProposedNews(jsonObj) {
        // this.mainHTML.innerHTML = ''
        let childrens = Array.from(this.proposedNewsHTML.children);
        if (childrens.length > 1) {
            childrens.forEach(children => children.remove());
        }
        let xMax = 20;
        for (let x = 1; x < xMax; x++) {
            if (jsonObj.articles[x].title == "[Removed]" || jsonObj.articles[x].urlToImage == null) {
                xMax++;
                continue;
            }

            let divForProposedNew = document.createElement("div");
            divForProposedNew.classList.add("currentProposedNewDiv");
            divForProposedNew.dataset.id = x.toString();

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

            divForProposedNew.append(image);
            divForProposedNew.prepend(h2Title);
            divForProposedNew.append(timeHTML);
            divForProposedNew.append(spanReadMore);

            this.proposedNewsHTML.append(divForProposedNew);
            divForProposedNew.addEventListener("click", this.checkProposedNew.bind(this));
        }
    }

    checkProposedNew(event) {
        let parentElement = event.target.closest(".currentProposedNewDiv");
        let idOfParent = parentElement.dataset.id;

        let currentArticleFromArray = this.arrayOfArticles[idOfParent];

        let articleObj = new CurrentArticle(currentArticleFromArray);
        this.proposedNewsHTML.style.display = "none";
    }
}


