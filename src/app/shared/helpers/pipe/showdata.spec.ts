import { ShowDataPipe} from './showdata';
describe('Pipe: ShowDataPipe', () => {
    let pipe: ShowDataPipe;

    beforeEach(() => {        
        pipe = new ShowDataPipe();
    });

    it('should be aware for null values', () => {
        expect(pipe.transform(undefined ,'')).toBe('');
    });

    it('should be transform to money format', () => {
        expect(pipe.transform('9124785' ,'MoneyFormat')).toBe('9,124,785');
    });

    it('should change true to checked icon', () => {
        expect(pipe.transform('true' ,'')).toBe('<i class="material-icons" color="primary">check_circle</i>');
    });

    it('should change false value to cancel icon', () => {
        expect(pipe.transform('false' ,'')).toBe('<i class="material-icons" color="disabled">cancel</i>');
    });

});