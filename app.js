var app = new Vue({
    el: "#root",
    data: {
        showingAddModal: false,
        showingEditModal: false,
        showingDeleteModal: false,
        errorMessage: "",
        sucessMessage: "",
        users: [],
        newUser: {username: "", email: "",mobile: ""},
        clickedUser:{},

    },
    mounted: function(){
        console.log("mounted");
        this.getAllUsers();

    },
    methods: {
        getAllUsers: function(){
            axios.get("http://localhost/Vue_CRUD/api.php?action=read")
            .then(function(response){
                if(response.data.error){
                    app.errorMessage = response.data.message;
                } else{
                    app.users = response.data.users;

                }
            });
        },
        saveUser: function(){
            console.log(app.newUser);
            var formData = app.toFormData(app.newUser);

                axios.post("http://localhost/Vue_CRUD/api.php?action=create", formData)
                .then(function(response){
                    app.newUser = {username: "", email: "",mobile: ""};
                    if(response.data.error){
                        app.errorMessage = response.data.message;
                    } else{
                        app.getAllUsers();
    
                    }
                });
        },
        updateUser: function(){

            var formData = app.toFormData(app.clickedUser);

                axios.post("http://localhost/Vue_CRUD/api.php?action=update", formData)
                .then(function(response){
                    app.clickedUser = {};
                    if(response.data.error){
                        app.errorMessage = response.data.message;
                    } else{
                        app.sucessMessage = response.data.message;
                        app.getAllUsers();
    
                    }
                });
        },
        deleteUser: function(){

            var formData = app.toFormData(app.clickedUser);

                axios.post("http://localhost/Vue_CRUD/api.php?action=delete", formData)
                .then(function(response){
                    app.clickedUser = {};
                    if(response.data.error){
                        app.errorMessage = response.data.message;
                    } else{
                        app.sucessMessage = response.data.message;
                        app.getAllUsers();
    
                    }
                });
        },
        selectUser(user){
            app.clickedUser = user;
        },
        toFormData: function(obj){
            var form_data = new FormData();
            for(var key in obj){
                form_data.append(key, obj[key]);
            }
            return form_data;
        },
        clearMessage: function(){
            app.errorMessage = "";
            app.sucessMessage= "";

        }
    }
})