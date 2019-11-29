# RequestedByUser
Custom Cireson Portal code to allow RequestedByUser and CreatedByUser to be displayed on the same work item form


The Problem! 

I started looking into this issue once a few customers had reported it and wanted to see if there was a solution, so what was the problem? Well, adding in these 2 fields onto a custom form in the portal requires you to put the property name on the form. The Property name is the target name of the relationship in this case. 

However, the Target name for the RequestedByUser and CreatedByUser relationships are identical, which is down to Microsoft for coding it like this...  

You then need to use a custom type projection against the form to load in both relationships as there is not a type projection out of the box that includes RequestedByUser. You’d think at this point all was setup and ready to work as expected… But in the portal, it brings back 2 identic targetId’s, one for CreatedByUser and one for RequestedByUser and the custom form does not understand which one to use and fails. 


The Solution! 

We came up with a solution to get the best of both worlds and have both relationships, as user pickers, displayed on the work item forms. 

We started by displaying the CreatedByUser field using the default type projection (as this works normally as expected) and then tackling how to get in the RequestedByUser. So, we built a custom type projection which only includes the RequestedByUser relationship and imported this MP into SCSM. 

Then we added on a user picker onto the custom form with a dummy Property Name to populate a field on the form to work with. Finally, we used some custom JavaScript to fill in the information on the currently empty field. It makes an API call to the GetProjection API, which gets passed the WorkItemId from the view model and contains the Id for the Type Projection from the MP mentioned earlier. We add the Name Relationship for the RequestedByUser Relationship manually and then set the information called from the API into the field we created. 
