import SanitizeInput from "./SanitizeInput";

describe('SanitizeInput', () => {
    it('should process empty string', () => {
        expect(SanitizeInput.process(undefined)).toEqual('');
    });

    it('should process string', () => {
        expect(SanitizeInput.process('string')).toEqual('string');
    });

    it('should process json', () => {
        const json = {
            sample: 'value'
        }
        expect(SanitizeInput.process(json)).toEqual(JSON.stringify(json));
    });
});