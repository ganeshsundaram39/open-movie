import "jquery";

export const getInput = type => {
    if (type === "title") {
        return {
            title: $(`.search__bar [name="title"]`).val(),
            year: $(`.search__bar [name="year"]`).val()
        };
    } else if (type === "id") {
        return {
            id:$(`.search__bar [name="id"]`).val()
        };
    }
};
