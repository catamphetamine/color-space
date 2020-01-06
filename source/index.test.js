import {
	hexToRgb,
	rgbToXyz,
	xyzToRgb,
	xyzToLab,
	labToLch,
	getPerceivedLightness
} from './color'

describe('color', () => {
	it('should calculate perceived lightness', () => {
		// Gray. L = 62, a = 0, b = 0.
		Math.round(getPerceivedLightness('#979797')).should.equal(62)
		// Red. L = 54, a = 81, b = 70.
		Math.round(getPerceivedLightness('#ff0000')).should.equal(70)
		// Red. L = 52, a = 78, b = 67.
		Math.round(getPerceivedLightness('#f30000')).should.equal(67)
		// Red.
		Math.round(getPerceivedLightness('#ec0000')).should.equal(66)
		Math.round(getPerceivedLightness('#df0000')).should.equal(63)
		Math.round(getPerceivedLightness('#c70000')).should.equal(58)
	})

	it('should convert rgb to xyz (and vice versa)', () => {
		// http://colormine.org/convert/rgb-to-xyz
		// Red. L = 54, a = 81, b = 70.
		rgbToXyz(hexToRgb('#ff0000')).map(_ => Math.round(_ * 100) / 100)
			.should.deep.equal([41.24, 21.26, 1.93])
		rgbToXyz(hexToRgb('#ffccaa')).map(_ => Math.round(_ * 100) / 100)
			.should.deep.equal([70.09, 67.35, 47.34])
		xyzToRgb(rgbToXyz(hexToRgb('#ffccaa'))).should.deep.equal([255, 204, 170])
	})

	it('should convert rgb to lab', () => {
		// http://colormine.org/convert/rgb-to-lab
		xyzToLab(rgbToXyz(hexToRgb('#ff0000'))).map(_ => Math.round(_ * 100) / 100)
			.should.deep.equal([53.23, 80.11, 67.22])
	})

	it('should convert rgb to lch', () => {
		// http://colormine.org/convert/rgb-to-lch
		labToLch(xyzToLab(rgbToXyz(hexToRgb('#ff0000')))).map(_ => Math.round(_ * 100) / 100)
			.should.deep.equal([53.23, 104.58, 40.00])
	})

	it('should handle clipping when converting from XYZ to RGB', () => {
		xyzToRgb([17.85607248588007, 12.42806461787917, 79.00988380321566])
			.should.deep.equal([0, 86, 234])
		xyzToRgb([82.0321584928188, 55.00500644674132, 148.20127614436367])
			.should.deep.equal([255, 149, 255])
	})
})