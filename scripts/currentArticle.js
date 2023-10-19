class CurrentArticle {
    currentArticleHTML = document.querySelector(".currentArticle");
    article;

    constructor(objArticleParam) {
        this.article = objArticleParam;
        this.createArticle();
    }

    createArticle() {
        let objData = this.updateData();
        this.currentArticleHTML.style.display = "flex";

        let titleArticle = document.createElement("h2");
        titleArticle.classList.add("titleArticleCurrent");
        titleArticle.textContent = objData.title;


        let publishedAt = document.createElement("span");
        publishedAt.classList.add("publishedAt");
        publishedAt.textContent = "Published at: " + objData.publishedAt.replace("T", ", ").replace("Z", "");


        let imgArticle = document.createElement("img");
        imgArticle.classList.add("imgArticle");
        imgArticle.src = objData.ulrToImage;


        let contentArticle = document.createElement("p");
        contentArticle.classList.add("contentArticle");
        contentArticle.textContent = objData.content;


        let author = document.createElement("h5");
        author.classList.add("author");
        author.textContent = "Author: " + objData.author;

        this.currentArticleHTML.prepend(titleArticle);
        this.currentArticleHTML.append(publishedAt);
        this.currentArticleHTML.append(imgArticle);
        this.currentArticleHTML.append(contentArticle);
        if (objData.author !== undefined && objData.author !== null) {
            this.currentArticleHTML.append(author);
        }
    }

    updateData() {
        return {
            title: this.article.title,
            content: this.article.content,
            publishedAt: this.article.publishedAt,
            author: this.article.author,
            ulrToImage: this.article.urlToImage
        }
    }
}
