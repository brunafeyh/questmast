import { SelectionProcessList } from "../types/selection-process";

export const getDefaultSelectionProcess = (selectionProcess?: SelectionProcessList) =>{
    return {
        name: selectionProcess?.name || '',
        openingDate: selectionProcess?.openingDate,
        cityFormDTO: {
            city: selectionProcess?.city.name,
            federateUnit: selectionProcess?.city.federateUnit.name
        },
        boardExaminerId: selectionProcess?.boardExaminer.id,
        institutionId: selectionProcess?.institution.id,
        contentModeratorEmail: selectionProcess?.contentModerator.mainEmail,
        selectionProcessStatusId: selectionProcess?.selectionProcessStatus.id,
        url: selectionProcess?.url
    }
}