(function executeRule(current, previous /*null when async*/) {
    gs.log("Business rule Trigger Ansible Playbook on Implement started for change request: " + current.number);
    gs.log("Change request " + current.number + " is now in Implement state");
        try {
            // Initialize REST message
            var r = new sn_ws.RESTMessageV2('GenFix', 'apply fix');
            r.setStringParameterNoEscape('chg_number', current.number);
            gs.log("Initialized REST message for change request: " + current.sys_id);
            // Set the variable for change_request_id
            r.setStringParameter('change_request_id', current.sys_id.toString());
            gs.log("Set change_request_id parameter: " + current.sys_id);
            // Execute REST message
            var response = r.execute();
            var responseBody = response.getBody();
            var httpStatus = response.getStatusCode();
            r.execute();
            // Log the response for debugging purposes
            gs.log("Ansible Tower response status: " + httpStatus);
            gs.log("Ansible Tower response body: " + responseBody);
            if (httpStatus !== 200) {
                gs.logError("Error triggering Ansible playbook. Status: " + httpStatus + ", Response: " + responseBody);
            } else {
                gs.log("Ansible playbook triggered successfully for change request: " + current.number);
            }
        } catch (ex) {
            var message = ex.getMessage();
            gs.logError("Exception in business rule Trigger Ansible Playbook on Implement: " + message);
        }
})(current, previous);