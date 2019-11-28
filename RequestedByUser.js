//Variables to Change//

//This is the name of the Property you have defined in your Incident.js/ServiceRequest.js custom form
var formPropertyName = "RequestedByUser";
//This is the id of the custom Type Projection you are using that includes the RequestedByUser Relationship
var requestedByUserTP = "5da0ec19-7284-5bc4-9d79-1acc38e4b0af"


//Execution
var workiteminfo = function workiteminfo() {
			$.ajax({
				url: "/api/V3/Projection/GetProjection?id=" + pageForm.viewModel.Id + "&typeProjectionId=" + requestedByUserTP,
				type: "GET",
				dataType: "json",
				contentType: 'application/json; charset=UTF-8',
				success: function (data){
					if (data.CreatedWorkItem) {
						pageForm.viewModel[formPropertyName].set("BaseId",data.CreatedWorkItem.BaseId);
						pageForm.viewModel[formPropertyName].set("DisplayName",data.CreatedWorkItem.DisplayName);
					}
				}
			});
		};

app.custom.formTasks.add('Incident', null, function (formObj, viewModel) {
		var RequestedByUserNR = {Name:formPropertyName,RelationshipId:"f6205e94-82f9-9a97-3b4f-c7127afb43a8"};
    	pageForm.viewModel.NameRelationship.push(RequestedByUserNR);
		formObj.boundReady( workiteminfo );
});

app.custom.formTasks.add('ServiceRequest', null, function (formObj, viewModel) {
		var RequestedByUserNR = {Name:formPropertyName,RelationshipId:"f6205e94-82f9-9a97-3b4f-c7127afb43a8"};
    	pageForm.viewModel.NameRelationship.push(RequestedByUserNR);
		formObj.boundReady( workiteminfo );
});