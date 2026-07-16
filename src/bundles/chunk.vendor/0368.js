module.exports = function (e, t) {
            function i() {
                throw new Error("GTLCode class cannot be instantiated");
            }
            ((i.List = {
                Open: "ListStart",
                Item: "ListNext",
                Close: "ListEnd",
            }),
                (e.exports = i));
        };
