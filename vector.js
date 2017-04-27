function vecAdd(v1, v2) {
	return {x:v1.x+v2.x, y:v1.y+v2.y}
}

function vecSub(v1, v2) {
	return {x:v1.x-v2.x, y:v1.y-v2.y}
}

function vecScale(vec, scale) {
	return {x:vec.x*scale, y:vec.y*scale}
}

function vecLengthSquare(vec) {
	return vec.x*vec.x + vec.y*vec.y;
}

function vecLength(vec) {
	return Math.sqrt( vecLengthSquare(vec) );
}

function vecNormalize(vec) {
	var length = vecLength(vec);
	return vecScale(vec, 1/length);
}

function min(a, b) {
	return (a < b) ? a : b;
}

function max(a, b) {
	return (a > b) ? a : b;
}

function clamp(value, lower, upper) {
	return min( max( value, lower), upper);
}

function randomRange(lower, upper) {
	return lower + (upper - lower) * Math.random();
}

function randomAngle() {
	return randomRange(-Math.PI, +Math.PI);
}