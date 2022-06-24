var app = angular.module("myApp", []);
app.controller("myCntrl", function ($scope, $http) {
    
    $scope.GetAllStudent = function () {
        $http({
            method: "get",
            url: "https://localhost:44376/Student/GetAllStudent"
        }).then(function (response) {
            $scope.Student = response.data;
        }, function () {
            alert("Error Occured");
        })
    };
    $scope.InsertStudent = function () {
        var type = document.getElementById("insertStd").getAttribute("value");
        if (type == "Submit") {
            $scope.Student = {};
            $scope.Student.Name = $scope.SName;
            $scope.Student.Age = $scope.SAge;
            $scope.Student.Department = $scope.SDepartment;
            $http({
                method: "post",
                url: "https://localhost:44376/Student/InsertStudentRecord",
                datatype: "json",
                data: JSON.stringify($scope.Student)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllStudent();
                $scope.SName = "";
                $scope.SAge = "";
                $scope.SDepartment = "";

            })

        } else {
            $scope.Student = {};
            $scope.Student.Id = sessionStorage.getItem("SId");
            $scope.Student.Name = $scope.SName;
            $scope.Student.Age = $scope.SAge;
            $scope.Student.Department = $scope.SDepartment;
            $http({
                method: "post",
                url: "https://localhost:44376/Student/UpdateStudentRecord",
                datatype: "json",
                data: JSON.stringify($scope.Student)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllStudent();
                $scope.SName = "";
                $scope.SAge = "";
                $scope.SDepartment = "";
                document.getElementById("insertStd").setAttribute("value", "Submit");

            })

        }
    };
    $scope.UpdateStudent = function (Std) {
        sessionStorage.setItem("SId", Std.Id);
        $scope.SName = Std.Name;
        $scope.SAge = Std.Age;
        $scope.SDepartment = Std.Department;
        document.getElementById("insertStd").setAttribute("value", "Update");

    };
    $scope.DeleteStudent = function (Std) {

        $http({
            method: "post",
            url: "https://localhost:44376/Student/DeleteStudent",
            datatype: "json",
            data: JSON.stringify(Std)
        }).then(function (response) {
            alert("Delete SuccessFully..!");
            $scope.GetAllStudent();
        })
    };

});