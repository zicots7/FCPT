package FreelanceClientsAndPayementsTracker.FCPT.Entity.Logs;

import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class LogsDetailsConverter {
    public Map<String,Object> validateAndConvert(
            InteractionType interactionType,
            Map<String,Object> details
    ){

        if(details == null){
            throw new IllegalArgumentException(
                    "Details cannot be empty"
            );
        }


        return switch(interactionType){

            case revision_request ->
                    validateRevision(details);


            case contract ->
                    validateContract(details);


            case requirement ->
                    validateRequirement(details);


            case dispute ->
                    validateDispute(details);


            case general_note ->
                    validateGeneralNote(details);

        };

    }



    private Map<String,Object> validateRevision(
            Map<String,Object> details
    ){

        if(!details.containsKey("revisionNumber")){
            throw new IllegalArgumentException(
                    "Revision number required"
            );
        }

        return details;
    }



    private Map<String,Object> validateContract(
            Map<String,Object> details
    ){

        if(!details.containsKey("contractValue")){
            throw new IllegalArgumentException(
                    "Contract value required"
            );
        }

        return details;
    }



    private Map<String,Object> validateRequirement(
            Map<String,Object> details
    ){

        return details;
    }



    private Map<String,Object> validateDispute(
            Map<String,Object> details
    ){

        details.put(
                "resolutionStatus",
                "pending"
        );

        return details;
    }



    private Map<String,Object> validateGeneralNote(
            Map<String,Object> details
    ){

        return details;
    }

}
