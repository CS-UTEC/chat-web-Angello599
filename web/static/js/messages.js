$(function(){
    var url = '/messages'
    var u = '/users'
    $("#grid").dxDataGrid({
        dataSource: DevExpress.data.AspNet.createStore({
            key: "id",
            loadUrl: url,
            insertUrl: url,
            updateUrl: url,
            deleteUrl: url,
            onBeforeSend: function(method, ajaxOptions) {
                ajaxOptions.xhrFields = { withCredentials: true };
            }
        }),

        editing: {

            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true
        },

        paging: {
            pageSize: 12
        },

        pager: {
            showPageSizeSelector: false,
            allowedPageSizes: [8, 12, 20]
        },

        columns: [{
            dataField: "id",
            dataType: "number",
            allowEditing: false
        }, {
            dataField: "content"
        }, {
            dataField: "sent_on",
            dataType: "date"
        }, {
            dataField: "user_from_id",
            lookup:{

              dataSource: DevExpress.data.AspNet.createStore({
                key: "id",
                loadUrl: u,
                insertUrl:u,
                updateUrl:u,
                deleteUrl:u,
                onBeforeSend: function(method, ajaxOptions) {
                    ajaxOptions.xhrFields = { withCredentials: true };}
              }),
              valueExpr: "id",
              displayExpr: "username"
            }
        }, {
            dataField: "user_to_id",
            lookup:{

              dataSource: DevExpress.data.AspNet.createStore({
                key: "id",
                loadUrl: u,
                insertUrl:u,
                updateUrl:u,
                deleteUrl:u,
                onBeforeSend: function(method, ajaxOptions) {
                    ajaxOptions.xhrFields = { withCredentials: true };}
              }),
              valueExpr: "id",
              displayExpr: "username"
            }
        }, ],
    }).dxDataGrid("instance");
});
