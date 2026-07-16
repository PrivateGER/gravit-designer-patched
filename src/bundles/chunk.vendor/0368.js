module.exports = function (module, exports) {
            function i() {
                throw new Error("GTLCode class cannot be instantiated");
            }
            ((i.List = {
                Open: "ListStart",
                Item: "ListNext",
                Close: "ListEnd",
            }),
                (module.exports = i));
        };
