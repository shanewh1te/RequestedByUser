# RequestedByUser
Custom Cireson Portal code to allow RequestedByUser and CreatedByUser to be displayed on the same work item form


# The Problem! 

I started looking into this issue once a few customers had reported it and wanted to see if there was a solution, so what was the problem? Well, adding these 2 fields to a custom form in the portal requires you to put the property name on the form. The property name is the target name of the relationship in this case. 

However, the target name for the RequestedByUser and CreatedByUser relationships are identical, which is down to Microsoft for coding it like this...

A custom type projection is needed for the form to load in both relationships as there is not a type projection out of the box that includes RequestedByUser.  But when you use the custom type projection the portal brings back 2 identical target Ids for ‘CreatedWorkItem', one for CreatedByUser and one for RequestedByUser.  The custom form does not understand which one to use and fails. 


# The Solution! 

We came up with a solution to get the best of both worlds having both relationships as user pickers displayed on the work item form. 

We started by displaying the CreatedByUser field using the default type projection as this works normally as expected. To include the RequestedByUser field, we built a custom type projection which only included the RequestedByUser relationship and imported this management pack into SCSM. 

Then we added a user picker onto the custom form with a dummy property name to populate a field on the form to work with. 

Custom JavaScript was used to fill in the information in the empty field, by making a call to the GetProjection API. The WorkItemId (obtained from the view model) and the Id for the type projection, from the management pack mentioned earlier, get passed into the API call to return the information. The code then adds the Name relationship for the RequestedByUser and then binds the information to the field. 

# Install
Once you have downloaded these files perform the following: 

1. Import the provided Management Pack (Recommended) 

2. Copy CustomForm.txt code into Incident.js and/or ServiceRequest.js custom form code 

3. Copy the RequestedByUser.js code to Custom.js or load it in using a script loader 
