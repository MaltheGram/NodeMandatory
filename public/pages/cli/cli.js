export const collapse = () => {
    const btnList = document.getElementsByClassName("collapsible")

    for (const btn of btnList) {
        btn.addEventListener("click", () => {
            btn.classList.toggle("active")
            let content = btn.nextElementSibling
            content.style.display === "flex" ? content.style.display = "none" : content.style.display = "flex"
        })
    }
}

collapse()

