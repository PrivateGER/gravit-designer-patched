module.exports = function (module, exports, require) {
        "use strict";
        const {
                ShareRoles: { CoAuthor, Developer, Reviewer, Approver, Owner },
                GFileReviewActions: { ACTION_REQUEST_REVIEW, ACTION_REQUEST_APPROVAL, ACTION_REOPEN, ACTION_APPROVE },
            } = require(10 /* designerConfig */),
            p = require(434);
        module.exports = {
            [Approver.id]: [ACTION_REQUEST_REVIEW, ACTION_REOPEN, ACTION_APPROVE, p.RESOLVE_COMMENT_ANNOTATION, p.RESOLVE_ALL_COMMENT_ANNOTATION, p.REOPEN_COMMENT_ANNOTATION],
            [CoAuthor.id]: [p.DELETE_COMMENT_ANNOTATION],
            [Developer.id]: [p.DELETE_COMMENT_ANNOTATION, p.RESOLVE_COMMENT_ANNOTATION, p.REOPEN_COMMENT_ANNOTATION],
            [Reviewer.id]: [],
            [Owner.id]: [ACTION_REQUEST_REVIEW, ACTION_REQUEST_APPROVAL, p.DELETE_COMMENT_ANNOTATION, p.RESOLVE_COMMENT_ANNOTATION, p.REOPEN_COMMENT_ANNOTATION],
        };
    };
